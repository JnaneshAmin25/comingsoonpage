import crypto from "node:crypto";
import net from "node:net";
import tls from "node:tls";

export const runtime = "nodejs";

type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  secure: boolean;
};

type Mail = {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
};

const supportEmail = process.env.NOTIFY_SUPPORT_EMAIL || "support@motionsoul.com.au";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const company = typeof body.company === "string" ? body.company.trim() : "";

    if (company) {
      return Response.json({ message: "Thanks, you are on the list." });
    }

    if (!emailPattern.test(email) || email.length > 254) {
      return Response.json({ message: "Please enter a valid email address." }, { status: 400 });
    }

    const config = getSmtpConfig();
    const launchSubject = "New Motion Soul launch notification request";
    const userSubject = "Thanks for your interest in Motion Soul";
    const displayName = name || "Motion Soul visitor";

    await sendMail(config, {
      to: supportEmail,
      from: config.from,
      replyTo: email,
      subject: launchSubject,
      text: [
        "A visitor asked to be notified when Motion Soul is live.",
        "",
        `Name: ${displayName}`,
        `Email: ${email}`,
        `Submitted: ${new Date().toISOString()}`,
      ].join("\n"),
      html: [
        "<p>A visitor asked to be notified when Motion Soul is live.</p>",
        "<ul>",
        `<li><strong>Name:</strong> ${escapeHtml(displayName)}</li>`,
        `<li><strong>Email:</strong> ${escapeHtml(email)}</li>`,
        `<li><strong>Submitted:</strong> ${new Date().toISOString()}</li>`,
        "</ul>",
      ].join(""),
    });

    await sendMail(config, {
      to: email,
      from: config.from,
      replyTo: supportEmail,
      subject: userSubject,
      text: [
        name ? `Hi ${name},` : "Hi,",
        "",
        "Thanks for your interest in Motion Soul. We will notify you when we are live.",
        "",
        "Motion Soul",
      ].join("\n"),
      html: [
        `<p>${name ? `Hi ${escapeHtml(name)},` : "Hi,"}</p>`,
        "<p>Thanks for your interest in Motion Soul. We will notify you when we are live.</p>",
        "<p>Motion Soul</p>",
      ].join(""),
    });

    return Response.json({
      message: "Thank you. We will notify you when we are live.",
    });
  } catch (error) {
    console.error("Notify request failed", error);

    if (error instanceof Error && error.message === "SMTP is not configured.") {
      return Response.json(
        { message: "We could not save your email right now. Please try again shortly." },
        { status: 500 },
      );
    }

    return Response.json(
      { message: "We could not save your email right now. Please try again shortly." },
      { status: 500 },
    );
  }
}

function getSmtpConfig(): SmtpConfig {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || supportEmail;
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  if (!host || !port || !user || !pass || !from) {
    throw new Error("SMTP is not configured.");
  }

  return { host, port, user, pass, from, secure };
}

async function sendMail(config: SmtpConfig, mail: Mail) {
  const client = await SmtpClient.connect(config);

  try {
    await client.ehlo();

    if (!config.secure) {
      await client.startTls(config.host);
      await client.ehlo();
    }

    await client.authLogin(config.user, config.pass);
    await client.mailFrom(extractEmail(config.from));
    await client.rcptTo(extractEmail(mail.to));
    await client.data(formatMessage(mail));
    await client.quit();
  } catch (error) {
    client.close();
    throw error;
  }
}

class SmtpClient {
  private socket: net.Socket | tls.TLSSocket;
  private buffer = "";

  private constructor(socket: net.Socket | tls.TLSSocket) {
    this.socket = socket;
    this.socket.setEncoding("utf8");
    this.socket.on("data", (chunk) => {
      this.buffer += chunk;
    });
  }

  static async connect(config: SmtpConfig) {
    const socket = config.secure
      ? tls.connect({
          host: config.host,
          port: config.port,
          servername: config.host,
        })
      : net.connect({
          host: config.host,
          port: config.port,
        });

    const client = new SmtpClient(socket);
    await client.waitForConnect();
    await client.readResponse(220);
    return client;
  }

  async ehlo() {
    await this.command(`EHLO ${getHostname()}`, 250);
  }

  async startTls(host: string) {
    await this.command("STARTTLS", 220);
    this.socket = tls.connect({
      socket: this.socket,
      servername: host,
    });
    this.socket.setEncoding("utf8");
    this.socket.on("data", (chunk) => {
      this.buffer += chunk;
    });
    await this.waitForConnect();
  }

  async authLogin(user: string, pass: string) {
    await this.command("AUTH LOGIN", 334);
    await this.command(Buffer.from(user).toString("base64"), 334);
    await this.command(Buffer.from(pass).toString("base64"), 235);
  }

  async mailFrom(email: string) {
    await this.command(`MAIL FROM:<${email}>`, 250);
  }

  async rcptTo(email: string) {
    await this.command(`RCPT TO:<${email}>`, 250);
  }

  async data(message: string) {
    await this.command("DATA", 354);
    await this.command(`${dotStuff(message)}\r\n.`, 250);
  }

  async quit() {
    await this.command("QUIT", 221);
    this.close();
  }

  close() {
    this.socket.destroy();
  }

  private async command(command: string, expectedCode: number) {
    this.socket.write(`${command}\r\n`);
    await this.readResponse(expectedCode);
  }

  private waitForConnect() {
    if (!this.socket.connecting) return Promise.resolve();

    return new Promise<void>((resolve, reject) => {
      this.socket.once("connect", resolve);
      this.socket.once("error", reject);
    });
  }

  private readResponse(expectedCode: number) {
    return new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        cleanup();
        reject(new Error("SMTP response timed out."));
      }, 15000);

      const onData = () => {
        const lines = this.buffer.split(/\r?\n/);
        const completeIndex = lines.findIndex((line) => /^\d{3} /.test(line));

        if (completeIndex === -1) return;

        const responseLines = lines.slice(0, completeIndex + 1);
        this.buffer = lines.slice(completeIndex + 1).join("\r\n");
        const lastLine = responseLines[responseLines.length - 1];
        const code = Number(lastLine.slice(0, 3));
        cleanup();

        if (code !== expectedCode) {
          reject(new Error(`SMTP expected ${expectedCode}, received ${responseLines.join(" ")}`));
          return;
        }

        resolve();
      };

      const onError = (error: Error) => {
        cleanup();
        reject(error);
      };

      const cleanup = () => {
        clearTimeout(timeout);
        this.socket.off("data", onData);
        this.socket.off("error", onError);
      };

      this.socket.on("data", onData);
      this.socket.once("error", onError);
      onData();
    });
  }
}

function formatMessage(mail: Mail) {
  const boundary = `motion-soul-${crypto.randomUUID()}`;
  const messageId = `<${crypto.randomUUID()}@${getEmailDomain(mail.from)}>`;
  const headers = [
    `From: ${formatAddress("Motion Soul", mail.from)}`,
    `To: ${formatAddress("", mail.to)}`,
    mail.replyTo ? `Reply-To: ${formatAddress("", mail.replyTo)}` : "",
    `Subject: ${encodeHeader(mail.subject)}`,
    `Message-ID: ${messageId}`,
    `Date: ${new Date().toUTCString()}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "X-Auto-Response-Suppress: All",
  ].filter(Boolean);

  return [
    ...headers,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 7bit",
    "",
    mail.text,
    "",
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 7bit",
    "",
    mail.html,
    "",
    `--${boundary}--`,
  ].join("\r\n");
}

function dotStuff(message: string) {
  return message.replace(/\r?\n/g, "\r\n").replace(/^\./gm, "..");
}

function formatAddress(name: string, email: string) {
  return name ? `${encodeHeader(name)} <${extractEmail(email)}>` : `<${extractEmail(email)}>`;
}

function encodeHeader(value: string) {
  if (/^[\x00-\x7F]*$/.test(value)) return value;
  return `=?UTF-8?B?${Buffer.from(value).toString("base64")}?=`;
}

function extractEmail(value: string) {
  const match = value.match(/<([^>]+)>/);
  return (match?.[1] || value).trim();
}

function getEmailDomain(value: string) {
  return extractEmail(value).split("@")[1] || "motionsoul.com.au";
}

function getHostname() {
  return process.env.SMTP_HELO_NAME || "motionsoul.com.au";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
