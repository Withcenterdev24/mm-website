# Privacy audit: October 9, 2026

Scope: the website's privacy page, checked against the available Godot source and current official store/provider guidance. The user approved the proposed policy revisions. This audit does not establish compliance in every jurisdiction or verify the final distributed game binaries.

## Evidence and corrections

- `godot/src/game/progress.gd` saves unlocked stages and whether the initial training question was answered or training started. `godot/src/game/settings.gd` saves language, handedness, bindings, touch sensitivity, graphics quality and the performance-overlay preference. Corrected the old policy's sound-setting example and single-file description.
- The inspected gameplay source has no network collection, tracking or advertising integration. Replaced the blanket permission statement with sensitive-feature examples; final Android/iOS permissions and bundled SDKs must still be checked on release binaries.
- Removed the claim that files never leave the device. OS-managed backups may include app data independently of the game's own transmission behavior. Clarified that local deletion does not necessarily erase backups and that iOS offloading differs from deleting an app.
- Replaced the blanket assertion that parental consent is unnecessary with a factual description of offline collection practices. Added parent-led support and a review/deletion route for personal information sent by children.
- Added separate English/Korean website and support disclosures for technical requests, Gmail, purposes, retention criteria, deletion requests, sharing, international processing, security limitations and applicable rights.
- Updated both game-policy dates to October 9, 2026. The original game repository policy has not been changed by this website task and should be synchronized before release.

## Official references

- [Google Play User Data policy](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en): developer/privacy contact, data practices, security, retention/deletion, public HTML URL, in-app access and consistency with Data safety declarations. A policy is required even for an app collecting no personal information.
- [Apple App Review Guidelines 5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage): collection/use disclosures, retention/deletion and policy access from App Store Connect and within the app.
- [Apple iCloud backup documentation](https://support.apple.com/en-us/108770): device backups can include app data.
- [Vercel privacy notice](https://vercel.com/legal/privacy-notice): website request information, provider processing and international operations.
- [Google privacy policy](https://policies.google.com/privacy): Gmail and other Google services.
- [FTC COPPA guidance](https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions): children's online personal information must be evaluated separately from offline gameplay. The guidance links to the revised rule; no blanket COPPA exemption is claimed.
- [European Commission privacy information](https://commission.europa.eu/law/law-topic/data-protection/information-individuals_en): transparency and individual rights where GDPR applies.

## Required owner and publication follow-up

1. Confirm the legal person/company behind Withcenter, its country and relevant contact details. Current public wording uses the supplied publisher name and support address; a legal identity or address was not invented.
2. Confirm and implement the approved support retention criteria: retain only while needed for the inquiry/follow-up, legal obligation or dispute; delete afterwards and handle earlier deletion requests. No arbitrary fixed period is promised. Decide how regularly the mailbox will be reviewed and who handles requests. Confirm any jurisdiction-specific response deadlines and obligations.
3. Confirm provider contracts/settings, international-transfer safeguards and any additional disclosures required for the operator's location and target markets. Linking provider policies alone does not establish all controller obligations.
4. Verify the live Vercel deployment uses HTTPS and that `/privacy/` is public without authentication or geographic blocking. Check actual response cookies/security features and logging settings. Deployment is still pending; hosting prose describes the configured hosting target for the published site.
5. Check the release binaries for permissions, SDKs, networking and backup behavior. Ensure the policy is accessible inside the app and entered in both stores. The source search did not find an in-app privacy link, so this needs confirmation or a separate game change. Do not infer store approval from website tests.
6. Synchronize the game's original English/Korean policy and store privacy declarations with actual released behavior. The website and optional support handling are distinguished from offline game collection.

## Verification

Validation results for the revised page are recorded in `docs/verification.md`. Existing page tests cover the game and service language boundaries, links and outline; browser checks exercise privacy navigation and mobile/tablet/desktop layouts without JavaScript.
