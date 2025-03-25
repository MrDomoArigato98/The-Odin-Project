import "./reset.css";
import "./style.css";
import { loadHomePageFn } from "./pageLoad";

const displayController = (function () {
    loadHomePageFn();

    const buttonList = document.querySelectorAll("button")
    const content = document.getElementById("content")
    console.log(buttonList)

    function wipeContent() {
        while (content.firstChild) {
            content.firstChild.remove();
        }
    }
    buttonList.forEach(button => {
        button.addEventListener("click", function () {
            if (button.id == "home") {
                wipeContent();
                loadHomePageFn();
            }
            if (button.id == "about") {
                wipeContent();
            }
            if (button.id == "contact") {
                wipeContent();
                console.log("contact")
            }
        })
    })

    return { wipeContent }
})();