let url;
let page = 1;

chrome.devtools.network.onRequestFinished.addListener((request) => {
  request.getContent(async (body) => {
    if (request.request && request.request.url) {
      if (request.request.url.includes("1.html")) {
        const defaultLink = request.request.url.substring(
          0,
          request.request.url.length - 7
        );

        url = defaultLink;

        const nameFile = defaultLink.substring(31, defaultLink.length);

        const urlCss = `${defaultLink}/${nameFile}.css`;

        while (true) {
          page += 1;

          const response = await fetch(defaultLink + "/" + page + ".html");

          let html = await response.text();

          if (!response.ok) {
            break;
          }

          body = `${body}${html}`;
        }

        document.querySelector("#code").innerHTML = `${createLinkCss(
          urlCss
        )}${body}`;
      }
    }
  });
});

const createLinkCss = (nameCss) => {
  return `<link rel="stylesheet" href="${nameCss}" />`;
};
