# Marketing Analytics Dataset

A generic sample dataset representing 12 months of digital marketing data (January–December 2024) for a UK-based marketing agency. Suitable for dashboards, reporting tools, data visualisation practice, or CRM/analytics integration demos.

---

## Files Overview

| File | Rows (approx.) | Description |
|---|---|---|
| `site_traffic_daily.csv` | 2,555 | Daily sessions, users, and conversions broken down by channel |
| `seo_keywords.csv` | 96 | Monthly keyword rankings, impressions, and clicks |
| `paid_campaigns.csv` | 84 | Monthly paid ad campaign performance across platforms |
| `page_performance.csv` | 144 | Monthly page-level metrics including Core Web Vitals |
| `audience_demographics.csv` | ~22,000 | Sessions and revenue by country, device, age, and gender |

---

## File Descriptions

### 1. `site_traffic_daily.csv`
Daily website traffic broken down by marketing channel. Reflects realistic seasonal trends and weekend dips.

| Column | Type | Description |
|---|---|---|
| `date` | DATE (YYYY-MM-DD) | Date of the record |
| `channel` | STRING | Traffic source (Organic Search, Paid Search, Social Media, Direct, Email, Referral, Display) |
| `sessions` | INT | Total sessions |
| `users` | INT | Total users |
| `new_users` | INT | First-time visitors |
| `pageviews` | INT | Total page views |
| `bounce_rate` | FLOAT | Ratio of single-page sessions (0–1) |
| `avg_session_duration_sec` | FLOAT | Average session length in seconds |
| `conversions` | INT | Goal completions (e.g. form fills, purchases) |
| `revenue_gbp` | FLOAT | Revenue attributed to sessions (GBP) |

---

### 2. `seo_keywords.csv`
Monthly organic search performance per keyword, as you'd export from Google Search Console.

| Column | Type | Description |
|---|---|---|
| `month` | STRING (YYYY-MM) | Month of the record |
| `keyword` | STRING | Search query |
| `avg_position` | FLOAT | Average ranking position in SERPs |
| `impressions` | INT | Times the page appeared in search results |
| `clicks` | INT | Times users clicked through |
| `ctr` | FLOAT | Click-through rate (clicks / impressions) |
| `keyword_type` | STRING | Brand or Non-Brand |
| `search_intent` | STRING | Informational, Navigational, or Transactional |

---

### 3. `paid_campaigns.csv`
Monthly paid advertising performance across Google Ads, Meta Ads, and LinkedIn Ads.

| Column | Type | Description |
|---|---|---|
| `month` | STRING (YYYY-MM) | Month of the record |
| `campaign_name` | STRING | Campaign identifier |
| `platform` | STRING | Ad platform |
| `impressions` | INT | Ad impressions served |
| `clicks` | INT | Ad clicks |
| `ctr` | FLOAT | Click-through rate |
| `spend_gbp` | FLOAT | Total ad spend (GBP) |
| `cpc_gbp` | FLOAT | Cost per click (GBP) |
| `conversions` | INT | Attributed conversions |
| `conversion_rate` | FLOAT | Conversions / clicks |
| `cpa_gbp` | FLOAT | Cost per acquisition (GBP) |
| `revenue_gbp` | FLOAT | Revenue from conversions (GBP) |
| `roas` | FLOAT | Return on ad spend (revenue / spend) |

---

### 4. `page_performance.csv`
Monthly performance per page including engagement metrics and Google Core Web Vitals.

| Column | Type | Description |
|---|---|---|
| `month` | STRING (YYYY-MM) | Month of the record |
| `page_path` | STRING | URL path (e.g. `/services/seo`) |
| `pageviews` | INT | Total views of the page |
| `unique_pageviews` | INT | Sessions that included this page |
| `avg_time_on_page_sec` | FLOAT | Average time spent on the page (seconds) |
| `bounce_rate` | FLOAT | Bounce rate for this page |
| `exit_rate` | FLOAT | Percentage of sessions that ended on this page |
| `lcp_sec` | FLOAT | Largest Contentful Paint (seconds) — target < 2.5s |
| `cls_score` | FLOAT | Cumulative Layout Shift — target < 0.1 |
| `fid_ms` | FLOAT | First Input Delay (ms) — target < 100ms |

---

### 5. `audience_demographics.csv`
Session and revenue breakdown by country, device type, age group, and gender.

| Column | Type | Description |
|---|---|---|
| `month` | STRING (YYYY-MM) | Month of the record |
| `country` | STRING | User country |
| `device` | STRING | Desktop, Mobile, or Tablet |
| `age_group` | STRING | Age bracket (18-24 through 65+) |
| `gender` | STRING | Male, Female, or Unknown |
| `sessions` | INT | Sessions for this segment |
| `conversions` | INT | Conversions for this segment |
| `revenue_gbp` | FLOAT | Revenue attributed to this segment (GBP) |

---

## Notes

- All data is **synthetically generated** — it does not represent any real business or website.
- Currency is **GBP (£)** throughout.
- Dates cover the full calendar year **2024**.
- Seasonal trends, weekend dips, and channel weighting are modelled to approximate realistic patterns.
- Core Web Vitals thresholds: LCP < 2.5s (Good), CLS < 0.1 (Good), FID < 100ms (Good).
