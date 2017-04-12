export function parseCookieStr(str, a) {
  if (!str) {
    return '';
  }

  let b = str.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}

export function saveCookie(name, value, days = 30) {
  let expires = '';

  let date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  expires = `; expires=${date.toUTCString()}`;

  document.cookie = `${name}=${value}${expires}; path=/`;
}

export function readCookie(name) {
  let nameEQ = `${name}=`;
  let ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];

    while (c.charAt(0) == ' ') {
      c = c.substring(1, c.length);
    }

    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }

  return '';
}

export function deleteCookie(name) {
  saveCookie(name, '', -1);
}
