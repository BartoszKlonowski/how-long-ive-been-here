
---

> [!Important]
> This repository and extension has been superseded by [Browsing Stats](https://github.com/BartoszKlonowski/browsing-stats). It has more features, options and has improved user experience. The **How long I've been here** add-on will no longer be maintained.
>
> Please give the **Browsing Stats** extension a shot by visiting the page and downloading it.
> Thank you!

---

<p align="center">
    <h1 align="center">
        <img align="center" src="./app/icons/mainIcon.png" width="100px" height="100px"/>
        How long I've been here?
    </h1>
</p>
<p align="center">
    Keep the track of how much time you spent on a website
</p>
<p align="center">
    <a href="https://github.com/BartoszKlonowski/how-long-ive-been-here/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/BartoszKlonowski/how-long-ive-been-here?style=plastic" alt="How Long Ive Been Here is released under the GNU GPL v3 license." />
    </a>
    <a href="https://github.com/BartoszKlonowski/how-long-ive-been-here/actions/workflows/HowLongIveBeenHere-UT.yml">
        <img src="https://img.shields.io/github/actions/workflow/status/BartoszKlonowski/how-long-ive-been-here/HowLongIveBeenHere-UT.yml?label=Tests&style=plastic" alt="Unit Tests status" />
    </a>
    <a href="https://github.com/BartoszKlonowski/how-long-ive-been-here/actions/workflows/HowLongIveBeenHere-CI.yml">
        <img src="https://img.shields.io/github/actions/workflow/status/BartoszKlonowski/how-long-ive-been-here/HowLongIveBeenHere-CI.yml?label=Extension%20verification&style=plastic" alt="Package verification status" />
    </a>
</p>

This project is the Mozilla Firefox extension plugin.
<br/>It's purpose is to allow user to track, monitor the time spent on each website.

**How does it work?**

Once you visit a website (no matter if by switching the tab, or entering a URL in the current tab), the extension catches that moment and summarize the time spent on the website you are leaving.
<br/>Please note, that this extension summarizes and shows the time spent for a website in general, not for a certain webpage.
What it means is that, for example of youtube service - this extension will calculate time spent on youtube in general, not the time spent on separate videos.

**Privacy**

This extension is to allow user to track his time, not to gather any data for statistics.
<br/>This extension does not sends any data to anywhere, but saves the data locally on your machine so that **your data stays with you**.

---
  
## Installation & Usage ##

This extension can be installed by:
* installing it via the Mozilla add-ons market by clicking the button bellow:<br/><a href="https://addons.mozilla.org/pl/firefox/addon/how-long-i-ve-been-here/"><img src="./.github/resources/get-the-addon.png" alt="" /></a>
* downloading it directly from the [Releases page](https://github.com/BartoszKlonowski/how-long-ive-been-here/releases) and install it manually in your browser

After successful installation you will see the extension icon in the upper-right corner of your browser.
Popup that appears contains two views:
| | | |
|:-:|:-|:-:|
| **Basic** | Initial view that displays the overall time spent on the currently active website. | <img width="400" height="auto" src=".github/resources/HowLongIveBeenHere-Example-Basic.gif" alt="" /> |
| **Extended** | Available after pressing the "More" button. Contains the list of all visited websites and the overall time spent on each of them.<br/><br/>Click on the selected website's name to open it in new tab. | <img width="400" height="auto" src=".github/resources/HowLongIveBeenHere-Example-Extended.gif" alt="" /> |

---


## Contributing ##

If you would like to contribute to the *How Long I've Been Here* project, you are more than welcome!
<br/>Any contribution is to make the project better and to improve the user's experience.
<br/>So if you'd like to contribute, you can do this in one of the following ways:

* Create an [Issue](https://github.com/BartoszKlonowski/how-long-ive-been-here/issues/new) and let the author handle it
<br/>Each issue created in the [Issues](https://github.com/BartoszKlonowski/how-long-ive-been-here/issues) section gives a chance of improving the project and make it even more useful.
* Create the [Pull Request](https://github.com/BartoszKlonowski/how-long-ive-been-here/compare) with the desired changes (please see further for how to develop this extension).

---

## Development ##

If you plan to implement changes to this extension:

1. Clone your fork of this repository
2. Run `npm install` in the root of this repository to install all the dependencies and tools<br/>Please make sure to have the `npm` installed first.
3. Implement your changes and test them:
<br/>Manually by following [these steps](https://extensionworkshop.com/documentation/develop/debugging/)
<br/>Or automatically by running `npm run test` and `npm run build` in the root of your clone

---

## Thank you! ##

If you like this project, or you find it helpful, please share your opinion with the author or just give it a star!
