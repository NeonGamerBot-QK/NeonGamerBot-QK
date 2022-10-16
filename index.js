fetch("/readme.md").then(d=>d.text()).then(markdown => {
document.documentElement.innerHtml = markdown;
})
