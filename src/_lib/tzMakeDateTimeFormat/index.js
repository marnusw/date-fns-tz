const dtfCache = {}

/**
 * Get a cached Intl.DateTimeFormat instance for the IANA `timeZone`. This can be used
 * to get deterministic local date/time output according to the `en-US` locale which
 * can be used to extract local time parts as necessary.
 *
 * Since the "short time zone name" is different according to the locale a different
 * locale from `en-US` can optionally be provided to get a Intl.DateTimeFormat that will
 * render time zone names in the most relevant format to that locale. For example,
 * on `en-US` "GMT+2" is rendered as such, but for `en-GB` it renders "CEST".
 */
export default function tzMakeDateTimeFormat (timeZone, locale) {
  if (locale) {
    // Trade-off between caching DTFs per locale too or generating new ones on demand for non en-US
    return newDTF(timeZone, locale)
  }
  if (!dtfCache[timeZone]) {
    dtfCache[timeZone] = newDTF(timeZone)
  }
  return dtfCache[timeZone]
}

function newDTF (timeZone, locale) {
  // Use en-US as a fallback against bad locales
  return new Intl.DateTimeFormat(locale ? [locale.code, 'en-US'] : 'en-US', {
    hour12: false,
    timeZone: timeZone,
    timeZoneName: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}
