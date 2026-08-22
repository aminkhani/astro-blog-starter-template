---
title: "Hardening Django in Production: A Practical Checklist"
description: "A practical, security-first checklist for locking down Django applications before they hit production."
pubDate: "Aug 16 2026"
heroImage: "/blog-placeholder-1.jpg"
tags: ["Django", "Hardening", "DevSecOps"]
---

Shipping a Django app that "works" is easy. Shipping one that can survive real traffic and real attackers takes a bit more discipline. Here's the checklist I run through before anything goes to production.

## 1. Settings hygiene

- `DEBUG = False` in production, always — a stray `DEBUG = True` leaks stack traces, settings, and installed apps to anyone who can trigger a 500.
- Keep `SECRET_KEY` out of source control. Load it from an environment variable or a secrets manager, and rotate it if it's ever been exposed.
- Set `ALLOWED_HOSTS` explicitly instead of leaving it open — this is your first line of defense against Host header attacks.
- Enable `SECURE_SSL_REDIRECT`, `SESSION_COOKIE_SECURE`, and `CSRF_COOKIE_SECURE` so cookies and traffic never travel over plain HTTP.

## 2. Dependency and CVE tracking

Django itself gets security patches regularly, and so do the packages you depend on. I treat this as an ongoing process, not a one-time task:

- Pin dependencies and review changelogs before upgrading.
- Cross-check installed packages against the CVE and NVD databases on a schedule, not just when something breaks.
- Automate this with a tool like `pip-audit` or `safety` in CI, so a vulnerable dependency fails the build instead of shipping.

## 3. Authentication and access control

- Use Django's built-in password validators, and don't weaken them without a good reason.
- Rate-limit login endpoints — brute force is still one of the most common attack paths.
- Apply the principle of least privilege to database users, API tokens, and admin accounts.

## 4. Infrastructure-level hardening

Application security only goes so far if the host underneath it is soft. On every server I deploy to, I apply baseline hardening aligned with CIS Benchmarks:

- Disable password-based SSH login in favor of key-based auth, and consider a fail2ban-style handler to cut down brute-force attempts.
- Keep the OS patched on a fixed cadence, not reactively.
- Run the app in containers with minimal base images and non-root users.

## 5. Monitoring and audit trails

Hardening isn't a one-time event — it's a posture you maintain. Logging authentication events, tracking failed requests, and feeding them into a SIEM or SOC workflow is what turns "we hardened it once" into "we'd actually notice if something went wrong."

None of this is exotic. It's mostly discipline: treat security configuration with the same rigor as application code, review it like code, and automate the checks so they don't depend on anyone remembering to run them manually.
