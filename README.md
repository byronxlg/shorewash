# shorewash.co.nz

Static marketing site for ShoreWash Limited (NZ company 9416064, NZBN 9429053543714),
exterior cleaning on Auckland's North Shore. Plain HTML, one CSS file, one small JS file.
No build step.

## Hosting

Deployed to GitHub Pages by `.github/workflows/pages.yml` on every push to `main`.
Preview URL: https://shorewash.botsmith.dev/ (GitHub Pages custom domain; DNS in
`byronxlg/x402-services` `infra/botsmith.tf`). The old https://byronxlg.github.io/shorewash/
redirects there.

`assets/site.js` adds `noindex` while the site is served from `github.io` or `botsmith.dev`, so the
staging copy does not compete with the real domain in search.

## Going live on shorewash.co.nz

The domain currently points at Wix (GoDaddy DNS, `ns31/ns32.domaincontrol.com`).
To cut over:

1. Change the Pages custom domain from `shorewash.botsmith.dev` to `www.shorewash.co.nz`
   (repo settings, or `gh api -X PUT repos/byronxlg/shorewash/pages -f cname=www.shorewash.co.nz`).
2. In GoDaddy DNS: `www` CNAME -> `byronxlg.github.io`; apex `A` records ->
   GitHub Pages IPs (185.199.108.153, .109.153, .110.153, .111.153). Remove the
   Wix records.
3. Enforce HTTPS in the Pages settings once the certificate is issued.

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

## Frontend maintenance

Typography uses local system fonts; the site makes no font or CDN requests.
Photographs have 480px and full-size WebP variants, with original JPEG fallbacks.
Keep each pair's dimensions and crop aligned when replacing comparison photos.
The hero preloads its after photo; gallery images load lazily with reserved space.

The quote form keeps a native POST to FormSubmit. JavaScript adds inline errors,
a sending state and a hosting-aware return URL. Without JavaScript, native browser
validation remains available and the return URL uses the production thanks page.
A request is not a confirmed booking. Delivery still requires FormSubmit activation.
Navigation and comparison photographs remain available without JavaScript.

There is no build, lint or test script in this repository. Before release, check
all five pages at mobile and desktop widths, keyboard navigation and comparisons,
form validation, local links and JSON-LD. Test form delivery only with an approved
real enquiry; do not send automated test submissions to the live endpoint.
