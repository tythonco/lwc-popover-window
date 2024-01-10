import { LightningElement, api } from 'lwc';

/**
 * A geneeric popover button utility component that displays the specified icon name with the
 * given attributes.
 * @param iconName: Passed onto the button's `iconName` attribute
 * @param altText: Passed onto the button's `alternativeText` attribute
 * @param title: Passed onto the button's `title` attribute
 * @param variant: Passed onto the button's `variant` attribute
 * @slot body The HTML to place in the popup window's body
 */
export default class PopoverButton extends LightningElement {
    @api iconName = 'utility:info';
    @api altText = '';
    @api title = '';
    @api variant = 'success';

    showPopover = false;

    /**
     * Toggle the popover when the button is clicked and add or remove an event listener for
     * hiding the popover when the user presses the escape key
     */
    handleButtonClick() {
        this.showPopover = !this.showPopover;
        const keyDownListener = (event) => {
            if (
                (this.showPopover && ['Escape', 'Esc'].includes(event.key)) ||
                !this.showPopover
            ) {
                window.removeEventListener('keydown', keyDownListener, false);
                this.showPopover = false;
            }
        };
        if (this.showPopover) {
            window.addEventListener('keydown', keyDownListener, false);
        } else {
            window.removeEventListener('keydown', keyDownListener, false);
        }
    }

    /**
     * Hide the popover when the user clicks outside of it.
     */
    handleOutsideClick() {
        this.showPopover = false;
    }
}
