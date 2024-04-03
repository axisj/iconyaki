# ICONYAKI

### iconyaki: Elevating Icon Transformation Experience for Frontend Developers

![iconyaki.png](resources%2Ficonyaki.png)

Introducing 'iconyaki,' a tool designed to provide frontend developers with the optimal icon transformation experience. 'iconyaki' offers a seamless and diverse range of icon conversion functionalities to quickly integrate visual elements into your projects.


## Features
IconYaki is an Electron application that allows for easy management of vector icons in React projects.
The app's key features include:
- Converting vector (svg) files into React components
- Exporting and importing React components to and from the project's icon target folder
- Testing color and size changes for registered icons
- Finding icons

## Screenshots
### Browsing Icons
![iconyaki-browsing.png](resources%2Ficonyaki-browsing.png)
You can test the converted React icons by changing the color, background color, and size of the registered icons.


### Managing Icons
![iconyaki-project-setting.png](resources%2Ficonyaki-project-setting.png)
You can manage icons by creating multiple projects for frontend developers with busy schedules.

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
