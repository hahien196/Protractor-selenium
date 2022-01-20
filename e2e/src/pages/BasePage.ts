import { browser, ElementFinder, ProtractorExpectedConditions } from "protractor";
import { protractor } from "protractor/built/ptor";
import { Const } from "../const/const";

export class BasePage {

    private ec: ProtractorExpectedConditions = browser.ExpectedConditions;
    private timeOut = Const.TIMEOUT_MS;

    /**
     * @description This function is used to do the click action
     * @param element - The element on whick click action to be performed
     */

    public async click(element: ElementFinder) {
        await browser.wait(this.ec.elementToBeClickable(element), this.timeOut,
            "Failed to click the element");
        await element.click();
    }
    /**
     * @description This function will append the text
     * @param element Pass the element locator
     * @param testData Data to be typed on the element
     */
    public async type(element: ElementFinder, testData: string) {
        await this.visibilityOf(element);
        await element.sendKeys(testData);
    }
    /**
    * @description This function will clear the existing value and then type the data
    * @param element Pass the element locator
    * @param testData Data to be typed on the element
    */

    public async clearAndType(element: ElementFinder, testData: string) {
        await this.visibilityOf(element);
        await element.clear()
        await element.sendKeys(testData);
    }

    public async assertText(element: ElementFinder, expectedText: string) {
        await this.visibilityOf(element);
        let actualText = await element.getText();
        expect(actualText.trim()).toBe(expectedText);
    }

    public async visibilityOf(element: ElementFinder) {
        await browser.wait(this.ec.visibilityOf(element), this.timeOut,
            "Element is not visible: ");
    }

    protected async inVisibilityOf(element: ElementFinder) {
        await browser.wait(this.ec.invisibilityOf(element), this.timeOut,
            "Element is still visible");
    }
    public async switchToFrame(frameNumber: number) {
        await browser.switchTo().frame(frameNumber);
    }


    public async typeAndTab(element: ElementFinder, testData: string) {
        await this.visibilityOf(element);
        await element.clear();
        await element.sendKeys(testData, protractor.Key.TAB);
    }

    public async typeAndEnter(element: ElementFinder, testData: string) {
        await this.visibilityOf(element);
        await element.clear();
        await element.sendKeys(testData, protractor.Key.ENTER);
    }

    public async mouseHoverAndClick(element: ElementFinder) {
        await browser.actions()
            .mouseMove(await element.getWebElement())
            .click()
            .perform();

    }
    public async moveToElement(element: ElementFinder) {
        await browser.actions()
            .mouseMove(await element.getWebElement())
            .perform();
    }

    public async clearInput(inputObject: ElementFinder) {
        await inputObject.sendKeys(protractor.Key.CONTROL, "a");
        await inputObject.sendKeys(protractor.Key.BACK_SPACE);
    }

    public async switchToTabNumber(number: number) {
        return await browser.getAllWindowHandles().then(async function (handles) {
            const newWindowHandle = handles[number];
            await browser.switchTo().window(newWindowHandle);
        });
    }

}