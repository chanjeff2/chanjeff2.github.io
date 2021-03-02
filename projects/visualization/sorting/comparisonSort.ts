// sorting
abstract class ComparisonSort {
    cancel: boolean = false;
    pause: boolean = false;

    dataset: Array<number>
    // target to compare
    // target to be compared
    constructor(dataset: Array<number>) {
        this.dataset = dataset;
    }

    async checkPause() {
        if (this.cancel) {
            throw "Cancel";
        }

        if (this.pause) {
            await new Promise((resolve, reject) => {
                resumeEventHandler = function() { 
                    console.log("Resolved, resuming now");
                    resolve("Resume");
                    document.querySelector("#start").removeEventListener("click", resumeEventHandler);
                };
                cancelEventHandler = function() {
                    console.log("Rejected, cancel old sorting");
                    reject("Cancel");
                    document.querySelector("#refresh").removeEventListener("click", cancelEventHandler);
                    document.querySelector("#sample-size").removeEventListener("change", cancelEventHandler);
                    document.querySelector("#sort-method").removeEventListener("change", cancelEventHandler);
                }
                document.querySelector("#start").addEventListener("click", resumeEventHandler)
                document.querySelector("#refresh").addEventListener("click", cancelEventHandler);
                document.querySelector("#sample-size").addEventListener("change", cancelEventHandler);
                document.querySelector("#sort-method").addEventListener("change", cancelEventHandler);
            });
        }
    }

    updateDataset(dataset: Array<number>) {
        this.dataset = dataset;
    }
    
    abstract sort(callback: Callback): Promise<Array<number>>;

    swap(index1: number, index2: number) {
        // return if same
        if (index1 == index2) {
            return;
        }

        let temp: number = this.dataset[index1];
        this.dataset[index1] = this.dataset[index2]
        this.dataset[index2] = temp;
    }
}

interface Callback {
    (dataset: Array<number>, current: number, target: number): any;
}

class SelectionSort extends ComparisonSort {
    async sort(callback: Callback): Promise<Array<number>> {
        for (let i = 0; i < this.dataset.length; ++i) {
            // set first element as min (storing the index)
            let minIndex: number = i;

            for (let j = i + 1; j < this.dataset.length; ++j) {
                try {
                    await this.checkPause();
                } catch (e) {
                    return [];
                }

                if (this.dataset[j] < this.dataset[minIndex]) {
                    minIndex = j;
                }

                await callback(this.dataset, minIndex, j);
            }
    
            this.swap(i, minIndex);

            await callback(this.dataset, i, minIndex);
        }

        return this.dataset;
    }
}

class InsertionSort extends ComparisonSort {
    async sort(callback: Callback): Promise<Array<number>> {
        for (let i = 1; i < this.dataset.length; ++i) {
            let j = i;
            while (j > 0 && this.dataset[j] < this.dataset[j - 1]) {
                try {
                    await this.checkPause();
                } catch (e) {
                    return [];
                }
                
                await callback(this.dataset, j, j - 1);
                this.swap(j, j - 1);
                --j;
            }
        }

        await callback(this.dataset, -1, -1)

        return this.dataset;
    }
}

class BubbleSort extends ComparisonSort {
    async sort(callback: Callback): Promise<Array<number>> {
        for (let j = 0; j < this.dataset.length; ++j) {
            for (let i = 1; i < this.dataset.length; ++i) {
                while (this.dataset[i] < this.dataset[i - 1]) {
                    try {
                        await this.checkPause();
                    } catch (e) {
                        return [];
                    }

                    await callback(this.dataset, i - 1, i);
                    this.swap(i, i - 1);
                }
            }
        }

        await callback(this.dataset, -1, -1);
        
        return this.dataset;
    }
}

class HeapSort extends ComparisonSort {
    heapSize: number = 0;
    heapSizeStartIndex: number = 0; // currently constantly at 0
    processing: boolean = false;

    /*
     *           1
     *         /   \
     *        2     3
     *       / \   / \
     *      4   5 6   7  ...
     */

    getHeapEnd() {
        // index of last element + 1
        return this.heapSizeStartIndex + this.heapSize;
    }

    getRightChildIndex(index: number) {
        let rightChildIndex = 2 * (index - this.heapSizeStartIndex + 1) + this.heapSizeStartIndex;
        return (rightChildIndex >= this.getHeapEnd()) ? NaN : rightChildIndex;
    }

    getLeftChildIndex(index: number) {
        let leftChildIndex = 2 * (index - this.heapSizeStartIndex + 1) + this.heapSizeStartIndex - 1;
        return (leftChildIndex >= this.getHeapEnd()) ? NaN : leftChildIndex;
    }

    getParentIndex(index: number) {
        let parentIndex = Math.floor((index - this.heapSizeStartIndex + 1) / 2) + this.heapSizeStartIndex - 1;
        return (parentIndex < this.heapSizeStartIndex) ? NaN : parentIndex;
    }

    getMinChildIndex(index: number) {
        let leftChildIndex = this.getLeftChildIndex(index);
        let rightChildIndex = this.getRightChildIndex(index);
        if (isNaN(leftChildIndex) && isNaN(rightChildIndex)) {
            return NaN;
        }
        
        if (isNaN(leftChildIndex)) {
            return rightChildIndex;
        }

        if (isNaN(rightChildIndex)) {
            return leftChildIndex;
        }

        return (this.dataset[leftChildIndex] < this.dataset[rightChildIndex]) ? leftChildIndex : rightChildIndex;
    }
    
    pushToHeap(index: number) {
        ++this.heapSize;

        while (index >= this.heapSizeStartIndex) {
            let parentIndex = this.getParentIndex(index);
            
            if (this.dataset[index] < this.dataset[parentIndex])
            this.swap(index, parentIndex);
            index = parentIndex;
        }
    }

    popMinFromHeap() {
        --this.heapSize;
        // swap first (min) with last item
        this.swap(this.heapSizeStartIndex, this.heapSizeStartIndex + this.heapSize); // <= note that this doesn't belongs to the heap
        // move the min item to the last of the chart
        for (let i = this.heapSizeStartIndex + this.heapSize + 1; i < this.dataset.length; ++i) {
            this.swap(i, i - 1);
        }

        // adjust (balance) the heap
        let index = this.heapSizeStartIndex;
        while (index < this.heapSizeStartIndex + this.heapSize) {
            let minChildIndex = this.getMinChildIndex(index);
            if (isNaN(minChildIndex)) {
                break;
            }

            if (this.dataset[index] > this.dataset[minChildIndex]) {
                this.swap(index, minChildIndex);
                index = minChildIndex;
            } else {
                break;
            }
        }
    }

    async sort(callback: Callback): Promise<Array<number>> {
        for (let i = 0; i < this.dataset.length; ++i) {
            try {
                await this.checkPause();
            } catch (e) {
                return [];
            }

            this.pushToHeap(i);
            await callback(this.dataset, i, -1);
        }

        while (this.heapSize > 0) {
            try {
                await this.checkPause();
            } catch (e) {
                return [];
            }

            this.popMinFromHeap();
            await callback(this.dataset, this.dataset.length - 1, 0);
        }

        return this.dataset;
    }
}

class MergeSort extends ComparisonSort {
    async mergeSortRecurHelper(first: number, last: number, callback: Callback) {
        if (first == last) {
            return 0; // for inversion
        }

        let mid = Math.floor((first + last) / 2);

        let left = await this.mergeSortRecurHelper(first, mid, callback);
        let right = await this.mergeSortRecurHelper(mid + 1, last, callback);
        let merge = 0; // for inversion

        let i = first;
        let j = mid + 1; // [i...mid, j...last]

        while (i < j && j <= last) {
            try {
                await this.checkPause();
            } catch (e) {
                return [];
            }
            
            await callback(this.dataset, i, j);
            if (this.dataset[j] < this.dataset[i]) {
                // j-th item is smaller than i-th item
                // for inversion number
                merge += mid - i;
                // move j to i
                for (let k = j; k > i; --k) {
                    this.swap(k, k - 1);
                }
                // increment i and mid as first half is shifted by one index
                ++i;
                ++mid;
                // point j to next item
                ++j;
            } else {
                // i-th item is smaller than j-th item
                // point i to next item
                ++i;
            }
        }

        return left + right + merge;
    }

    async getInversionNumber() {
        return await this.mergeSortRecurHelper(0, this.dataset.length - 1, () => {  });
    }

    async sort(callback: Callback): Promise<Array<number>> {
        await this.mergeSortRecurHelper(0, this.dataset.length - 1, callback);
        await callback(this.dataset, -1, -1);
        return this.dataset;
    }
}