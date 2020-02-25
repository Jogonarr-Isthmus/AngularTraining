export class SelectItem {
    public value: string | number;
    public text: string;

    constructor(value: string | number, text: string) {
        this.value = value;
        this.text = text;
    }
}
