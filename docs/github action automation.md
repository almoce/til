---
tags: [github, automation, git]
---
# github action automation

- select action menu at github menu tab
- create a new workflow, chose a pre configuration, ex: node.js
- `on` defined event to trigger this workflow, ex: `push`, `pull_request`
- jobs environment, `runs-on`, ex: `ubuntu-latest`
- `strategy` can define different version to use in this workflow, which this can be not necessary for build
- `steps` for workflow steps
```yaml
steps:
 - use: action/checkout@v2 # git chekcout to current reposition with default branch
 - name: use node.js # name of this action
    use: acton/setup-node@v2 # setup the nodejs
    with: 
      node-verstion: '17.x' # define the version to this aciton
      cache: 'npm'
 - run: npm ci # install dependencies, or npm install, npm ci work with package-lock.json
 - run: npm run build # build the project
```

if we checkout to another branch or reposition, all new files or generated files will be lost
github provide a solution for store file in github artifact. 

```yaml
  - uses: actions/upload-artifact@v2
    with:
      name: build # name of artifact
      path: build # path to upload, can be file or folder
```
to checkout to a different branch of same repository. 

```yaml
 - uses: actions/checkout@v2
      with:
        ref: branchname # target branch name
```

download file of folder just upload in previous step

```
  - uses: actions/download-artifact@v2
      with:
        name: build
        path: build
```


finaly wen can make the commit at target branch or repository
```yaml

 - run: |
        cp -a build/* ./ # copy the build files
        git config user.name github-actions
        git config user.email github-actions@github.com
        git add files-need-to-commit # add files
        git commit -m "generated"
        git push
```
