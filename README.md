# github-action-package-values

Gets commit and package values for your Node project.

## Usage

```yaml
jobs:
  runs_on: ubuntu-latest
  steps:
    - name: Checkout latest
      uses: actions/checkout@v2
    - name: Get package values
      uses: jarrettmeyer/github-action-package-values@v1
      id: package_values
# snip
```

## Input vars

Input vars are added with a `with` statement.

```yaml
- name: Get package values
  uses: jarrettmeyer/github-action-package-values@v1
  id: package_values
  with:
    path: ./folder
```

| var  | required | description                                      |
| :--- | :------- | :----------------------------------------------- |
| path | no       | Directory of your package.json file, default `.` |

## Output vars

| var              | description                                                       |
| :--------------- | :---------------------------------------------------------------- |
| commit_sha       | The commit sha, e.g. `ecca45978ef4d50f5b7042f898ddc383f89b6ead`   |
| commit_sha_short | The short commit sha, e.g. `ecca459`                              |
| commit_author    | The commit author, e.g. `Jarrett Meyer <meyer_jarrett@lilly.com>` |
| commit_date      | The commit date, e.g. `Tue Mar 30 05:28:25 2021 -0400`            |
| commit_timestamp | The commit date as UNIX timestamp, e.g. `1617096505000`           |
| package_name     | The `package.json` name, e.g. `github-action-package-values`      |
| package_version  | The `package.json` version, e.g. `1.0.0`                          |

## Errors

This action will throw errors under the following conditions:

- `package.json` file does not exist in the given path
- `package.json` does not contain a `name` property
- `package.json` does not contain a `version` property
