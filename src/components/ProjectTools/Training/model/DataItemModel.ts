export default class DataItemModel {
    type: string;
    date: Date;
    content: string;
    tags: Array<string>;

    constructor(type: string, date: Date, content: string, tags: Array<string>) {
        this.type = type;
        this.date = date;
        this.content = content;
        this.tags = tags;
    }
}