interface Queue<T> {
    getLength(): number;
    enqueue(item: T);
    dequeue(): T;
    peek(): T;
}
