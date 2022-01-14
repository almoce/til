# setting up github pages

- go to github project `settings`
- find the `Pages` on the left sidebar
- change the source option, select the branch to be set the github page
- also available setting custom domain in the same page[^1]
    - go to your domain provider, find the domain setting
    - add or modify configuration, ex: add new record
    - point the `cname` to `<username>.github.io` 
    - back to github project settings
- change the domain setting to the domain just configured in previous steps
- custom the 404 pages, add new file `404.md` or `404.html`, markdown need add YAML front matter to the beginning[^2]
    ```yaml
    ---
    permalink: /404.html
    ---
    ```


____

[^1]: [Github Custom Domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
[^2]: [Custom 404](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site)
