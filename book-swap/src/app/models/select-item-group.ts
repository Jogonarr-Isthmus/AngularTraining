import { SelectItem } from './select-item';

export class SelectItemGroup {
    public name: string;
    public options: SelectItem[];

    constructor(name: string, options: SelectItem[]) {
        this.name = name;
        this.options = options;
    }
}
