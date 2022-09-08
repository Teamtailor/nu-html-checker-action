# nu-html-checker-action

This action runs https://validator.nu/ on a given URL and outputs the amount of errors.

## Inputs

### `url`

**Required** The URL of the website to validate.

## Outputs

### `error-count`

The amount of validation errors found
### `report-url`

URL to the report

## Example usage
```
uses: actions/hello-world-javascript-action@v1.8
with:
  url: 'https://example.com'
```