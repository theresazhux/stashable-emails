# Stashable emails
Our approach to transactional, system, and marketing emails. For detailed information on components and particular styles, head to our [wiki](https://github.com/anthonycandraw/stashable-emails/wiki).

## Getting set up
### The easy part
This is just getting us into the ballpark.
- Download an IDE of your choice. This is how you will edit code.
  - You can use [Atom](https://atom.io/), or [VS Code](https://code.visualstudio.com/) if you want to be difficult like *Theresa*.
- Download a version control software that links with GitHub, if you're a newbie at this. This is how you will download, sync, and push the latest code to all members of this repository.
  - You can use [GitHub Desktop](https://desktop.github.com/) or [SourceTree](https://www.sourcetreeapp.com/)
- Download an FTP software of your choice. This is how you will upload images to our S3 bucket.
  - You can [download Cyberduck](https://cyberduck.io/) for free, or purchase [Transmit](https://panic.com/transmit/).
- Install the latest stable version of NodeJS. You'll need this to proceed with the next steps.
  - [Download the latest NodeJS](https://nodejs.org/en/).
- Download our standard compression tools. This is how you will compress images before upload.
  - [ImageAlpha](https://pngmini.com/) and [ImageOptim](https://imageoptim.com/mac) for any `.png` files (yes, *both*).
  - [JPEGMini](https://www.jpegmini.com/) for `.jpg` or `.jpeg` files.

### Installing SCSS
SCSS is our styling language of choice, but requires an install
1. Once you have completed the steps above (titled, "The easy part"), open Terminal.
2. Type in the following and hit Enter.
```
npm install -g sass
```
3. If you receive an error in response, type in the following and hit enter, followed by your computer's profile password immediately after and hit Enter.
```
sudo npm install -g sass
```
4. Wait for it to install.

### Installing Gulp
Gulp is important to our process of inlining our styles and minifying the resulting `.html` file to be as compact as possible.
1. With Terminal still open, type in the following and hit Enter:
```
$ npm install --global gulp-cli
```
2. If this doesn't work as above, try entering the following, followed by your computer's profile password.
```
sudo $ npm install --global gulp-cli
```
3. Once that is done installing, use Terminal to install the Gulp Email Builder plugin by entering: 
```
npm install gulp-email-builder
```
4. As a final step, install the Gulp HTML minification plugin by entering: 
```
$ npm install --save gulp-htmlmin
```

---

## Running Gulp

### What is Gulp?
Gulp is an automation tool that allows certain plugins to be installed and utilized. In our case, we're using plugins that inline our CSS styles (a requirement for all HTML emails) and strip out any excess space/comments (compressing the code to as small as possible).

### What do we use Gulp for?
Gulp allows us to build an email in a friendlier, more legible, and more efficient manner by taking the hard work out of our process. For instance, normally an HTML email would have to have all styles inlined (meaning that all particular styles to an HTML element have to be written into the element itself). Gulp allows us to use a separate SCSS/CSS stylesheet and inline the styles automatically afterward, making a much more editable document.

### How do I get Gulp operating properly?
- A `gulpfile.js` file should be available in all directories that have `.html` files.
- The contents of that file should be as follows:
```
var gulp = require('gulp');

var emailBuilder = require('gulp-email-builder');
var htmlmin = require('gulp-htmlmin');

var options = {  };
var builder = emailBuilder(options);

gulp.task('emailBuilder', function() {
  return gulp.src(['*.html'])
    .pipe(emailBuilder(options).build())
    .pipe(htmlmin({collapseWhitespace: true, minifyCSS: true, removeComments: true}))
    .pipe(gulp.dest('./output/'));
});
```
- To inline styles and minify the code of a specific `.html` file, run the following Terminal command in the directory of the file:
```
gulp emailBuilder
```
- Your inlined and minified file should be in a sub-directory of your original `.html` file tilted 'output'.
- If you encounter an error, please seek assistance.

---

## Some things to note
- Emails are very fragile and prone to breaking on different email clients, so...
- *Always test emails*, even if a change feels very minor. While you're at it...
- *Always test results in an email client that our customers actually use.*

## Customer email clients

| Email service providers (by size) | Approx size |
|-----------------------------------|:-----------:|
| AOL                               |     ---     |
| Gmail                             |     ---     |
| Yahoo!                            |     ---     |
| Outlook.com                       |     ---     |
| iCloud                            |     ---     |
| .EDU                              |     ---     |
| Other                             |     ---     |


| Email software clients | Web | Desktop | iOS | Android |
|------------------------|:---:|:-------:|:---:|:-------:|
| Gmail                  |  Y  |    -    |  Y  |    Y    |
| Yahoo!                 |  Y  |    -    |  Y  |    Y    |
| AOL                    |  Y  |    -    |  Y  |    Y    |
| Outlook.com            |  Y  |    -    |  -  |    -    |
| Apple Mail             |  -  |    Y    |  Y  |    -    |
| Samsung Mail           |  -  |    -    |  -  |    Y    |
| Outlook                |  -  |    Y    |  Y  |    Y    |

---

## Terminology for HTML

### Blocks
A block is a colloquial and unofficial term for snippets of HTML code which perform certain styles or functions, for example:
```html
<!--SPACER 24PX-->
<tr>
  <td class="spacer-24-static" height="24">&nbsp;</td>
</tr>
<!--%%%%%%-->
```

### Element
An "element" is a HTML object, for example:
```html
<td>
  ...
</td>
```

### Attributes
An "attribute" is a HTML-only rule which is inlined into an element.
```html
<... align="..." class="...">
</...>
```

## Terminology for SCSS & CSS

### Rule Declaration in CSS
A “rule declaration” is the name given to a selector (or a group of selectors) with an accompanying group of properties. Here's an example:
```css
.cta {
  border-radius: 4px;
  height: 46px;
  width: 200px;
}
```

### Selectors
In a rule declaration, “selectors” are the bits that determine which elements in the DOM tree will be styled by the defined properties. Selectors can match HTML elements, as well as an element's class, ID, or any of its attributes. Here are some examples of selectors:
```css
.column {
  ...
}
```

### Properties
Finally, properties are what give the selected elements of a rule declaration their style. Properties are key-value pairs, and a rule declaration can contain one or more property declarations. Property declarations look like this:
```css
/* some selector */ {
  width: 100%;
}
```

---

## HTML
### Formatting
- Use soft tabs (2 spaces) for indentation.
- Use `<table>` structures only (ie, no `<div>` tags or any new HTML5 semantics).
- Comment heavily for clarity.
- All elements should have a closing tag.
- Retain all styling to our two CSS files.

## CSS
### Formatting
- Use soft tabs (2 spaces) for indentation
- Prefer dashes over camelCasing in class names.
- Underscores and PascalCasing are okay if you are using BEM (see OOCSS and BEM below).
- Do not use ID selectors
- When using multiple selectors in a rule declaration, give each selector its own line.
- Put a space before the opening brace { in rule declarations
- In properties, put a space after, but not before, the : character.
- Put closing braces } of rule declarations on a new line
- Put blank lines between rule declarations

#### You're a bad developer
```css
.avatar{
    border-radius:50%;
    border:2px solid white; }
.no, .nope, .not_good {
    // ...
}
#lol-no {
  // ...
}
```

#### You're a good developer
```css
.avatar {
  border-radius: 50%;
  border: 2px solid white;
}

.one,
.selector,
.per-line {
  // ...
}
```

### Style & methodology
- The preference is to use a form of Object-Oriented CSS (OOCSS) for writing general classes that can be assigned to multiple HTML elements.
- To read up on OOCSS, you can [read a brief explanation of it here](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/).
- It should be noted that if it's possible to shrink the size of a `.html` file by using unique styles for common elements, it should be done as a favorable option over OOCSS.
- Here's an example of OOCSS:

#### This is bad
Notice how we're re-using styles in multiple classes?
```html
<td class="masthead-td">
  ...
</td>

<td class="footer-td">
  ...
</td>
```
```css
.footer-td {
  color: $gray-md;
  font-size: 13px;
  padding: 0 24px;
}

.masthead-td {
  padding: 0 24px;
}
```

#### This is good
```html
<td class="pdg-sd-24">
  ...
</td>

<td class="fnt-gray fnt-sm pdg-sd-24">
  ...
</td>
```

```css
.fnt-gray {
  color: $gray-lt;
}

.fnt-sm {
  font-size: 13px;
}

.pdg-sd-24 {
  padding: 0 24px;
}
```

### Commenting
- Prefer line comments (`// ...` in your SCSS, `/* ... */` in your CSS) to block comments.
- Prefer comments on their own line. Avoid end-of-line comments.
- Write detailed comments for code that isn't self-documenting:
  - Compatibility or email client-specific hacks
  
### Variables
Prefer dash-cased variable names (e.g. `$my-variable`) over camelCased or snake_cased variable names.
  
### Nesting
Do not nest more than three levels deep.
```css
.page-container {
  .content {
    .profile {
      // STOP!
    }
  }
}
```
When selectors become this long, you're likely writing CSS that is:
- Strongly coupled to the HTML (fragile) —OR—
- Overly specific (powerful) —OR—
- Not reusable

**Again: never nest ID selectors!**

If you must use an ID selector in the first place (and you should really try not to), they should never be nested. If you find yourself doing this, you need to revisit your markup, or figure out why such strong specificity is needed. If you are writing well-formed HTML and CSS, you should never need to do this.

---

## Best practices
- While content can be altered by anyone, only designers should be affecting styles and designs, as these styles could affect other active emails.
- Do not inline any styles into the HTML directly.
- Do not put any styles in the `<style>...</style>` tags in the HEAD of the HTML document.
- Avoid HTML attributes when possible.
- Compress images as much as possible.
- Use as few links as possible. Push back on too many links.
- *Most important: always run a test variant for marketing emails.*
