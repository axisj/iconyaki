# ICONYAKI

### iconyaki: Elevating Icon Transformation Experience for Frontend Developers

![iconyaki.png](resources%2Ficonyaki.png)

Introducing 'iconyaki,' a tool designed to provide frontend developers with the optimal icon transformation experience. 'iconyaki' offers a seamless and diverse range of icon conversion functionalities to quickly integrate visual elements into your projects.

## How to Use iconyaki

### 1. Download iconyaki app


### 2. Enter the Project Name

Click the 'Config' button at the page header to enter the project name and icon prefix name.

### 3. Upload your SVG file

Click the 'Upload' menu at the page header to upload your SVG file.
and check the 'Icon List' section to see the list of icons you uploaded.
finally, click the 'Generate' button to generate the icon files.

### 4. Export icons

You can see the index page to see the generated icon files.
and 'Export' button at the header.

## Usage Icon Files

```typescript
import { IconBin } from "[your path]/icon";

const IconBinExample = () => {
  return (
    <div>
      <IconBin />
    </div>
  );
};
```


## Development

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```
