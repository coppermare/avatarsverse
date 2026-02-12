# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in Avatarverse, please report it responsibly:

1. **Do not** open a public GitHub issue for security vulnerabilities
2. Open a [private security advisory](https://github.com/coppermare/avatarverse/security/advisories/new) on GitHub, or email the maintainer
3. Include: description of the vulnerability, steps to reproduce, potential impact
4. We will acknowledge within 48 hours and provide an update on the fix timeline

Avatarverse is a client-side avatar generation library. It does not handle user credentials, store sensitive data, or make network requests. Security concerns typically relate to:

- Input sanitization (seed strings, URL parameters)
- Dependency vulnerabilities
- SVG output safety (XSS if avatars are rendered unsafely)

We take all reports seriously and will work to address validated issues promptly.
