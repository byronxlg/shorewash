# shorewash.co.nz

Static marketing site for ShoreWash Limited (NZ company 9416064, NZBN 9429053543714),
exterior cleaning on Auckland's North Shore. Plain HTML, one CSS file, one small JS file.
No build step.

## Hosting

Deployed to GitHub Pages by `.github/workflows/pages.yml` on every push to `main`.
Staging URL: https://byronxlg.github.io/shorewash/

`assets/site.js` adds `noindex` while the site is served from `github.io`, so the
staging copy does not compete with the real domain in search.

## Going live on shorewash.co.nz

The domain currently points at Wix (GoDaddy DNS, `ns31/ns32.domaincontrol.com`).
To cut over:

1. Add a `CNAME` file containing `www.shorewash.co.nz` to this repo.
2. In GoDaddy DNS: `www` CNAME -> `byronxlg.github.io`; apex `A` records ->
   GitHub Pages IPs (185.199.108.153, .109.153, .110.153, .111.153). Remove the
   Wix records.
3. Repo settings -> Pages -> custom domain `www.shorewash.co.nz`, enforce HTTPS
   once the certificate is issued.

## Quote form

Posts to FormSubmit (`https://formsubmit.co/contact@shorewash.co.nz`). The first
submission sends an activation email to contact@shorewash.co.nz; the form does not
deliver until that link is clicked. After activation FormSubmit also offers a hashed
endpoint which can replace the plain address in `index.html` to keep it out of the
page source.

## Content

Company details, prices, testimonial and photos come from the previous Wix site and
the Companies Register. The process steps and FAQ answers are drafted as standard
practice for the trade and should be checked by the owner.
