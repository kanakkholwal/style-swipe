export interface Queue<T> {
  readonly length: number;

  enqueue(item: T): T;
  dequeue(): T | undefined;
  peek(): T | undefined;
}

export class HashQueue<T> implements Queue<T> {
  protected items: Map<number, T> = new Map();
  protected headIndex = 0;
  protected tailIndex = 0;

  get length(): number {
    return this.items.size;
  }

  enqueue(item: T): T {
    const itemIndex = this.tailIndex++;
    this.tailIndex >= Number.MAX_SAFE_INTEGER && (this.tailIndex = 0);

    this.items.set(itemIndex, item);

    return item;
  }

  dequeue(): T | undefined {
    if (this.items.size) {
      const itemIndex = this.headIndex++;
      this.headIndex >= Number.MAX_SAFE_INTEGER && (this.headIndex = 0);

      const result = this.items.get(itemIndex);
      this.items.delete(itemIndex);

      return result;
    }
  }

  peek(): T | undefined {
    return this.items.size ? this.items.get(this.headIndex) : undefined;
  }
}
