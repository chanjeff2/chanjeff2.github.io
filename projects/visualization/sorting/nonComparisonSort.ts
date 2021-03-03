abstract class NonComparisonSort extends SortAlgorithm {

}

class CountingSort extends NonComparisonSort {
    modulo(value: number, modulus: number): number {
        return ((value % modulus) + modulus) % modulus;
    }

    async sort(callback: Callback, arraySize: number = -1, key: (value: number) => number = null): Promise<Array<number>> {
        if (key == null) {
            // key is given in radix sort
            // find size of whole array
            // store min at A[0], max at A[max - min + 1]
            let min = Math.min(...this.dataset);
            let max = Math.max(...this.dataset);
            arraySize = max - min + 1;

            key = function(value: number) {
                return value - min;
            }
        }
        
        let count = Array(arraySize).fill(0);

        // linear scan for occurrence, make count into histogram
        for (let i = 0; i < this.dataset.length; ++i) {
            try {
                await this.checkPause();
            } catch (e) {
                return [];
            }
            
            count[key(this.dataset[i])] += 1;
            
            await callback(this.dataset, i, -1);
        }

        // make count into cdf
        for (let i = 1; i < arraySize; ++i) {
            count[i] += count[i - 1];
        }

        let oldArray = [...this.dataset];

        // plug back the value from the back
        for (let i = oldArray.length - 1; i >= 0; --i) {
            try {
                await this.checkPause();
            } catch (e) {
                return [];
            }

            let value = oldArray[i];

            this.dataset[count[key(value)] - 1] = value;
            await callback(this.dataset, count[key(value)], -1);
            count[key(value)] -= 1;
        }

        await callback(this.dataset, -1, -1);
        return this.dataset;
    }
}

class RadixSort extends CountingSort {
    k_digit(value: number, k: number) {
        // k of LSD is 1
        return this.modulo(Math.floor(value / (10 ** (k - 1))), 10);
    }

    async sort(callback: Callback): Promise<Array<number>> {
        let max = Math.max(...this.dataset.map(a => Math.abs(a)));
        let maxDigit = Math.floor(Math.log10(max)) + 1;

        // additional sort for sign
        await super.sort(callback, 2, value => {
            return (value >= 0) ? 1 : 0;
        });

        for (let i = 0; i < maxDigit; ++i) {
            await super.sort(callback, 10, value => {
                return this.k_digit(value, i + 1);
            });
        }

        await callback(this.dataset, -1, -1);
        return this.dataset;
    }
}