interface Queue<T> {
    getLength(): number;
    enqueue(item: T);
    dequeue(): T;
    peek(): T;
    forEach(callBack: (item: T) => boolean): void;
    forEachInBody(callBack: (item: T) => boolean): void;
}
