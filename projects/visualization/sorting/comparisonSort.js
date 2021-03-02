var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// sorting
var ComparisonSort = /** @class */ (function () {
    // target to compare
    // target to be compared
    function ComparisonSort(dataset) {
        this.dataset = dataset;
    }
    ComparisonSort.prototype.checkPause = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (cancelSorting) {
                            throw "Cancel";
                        }
                        if (!pauseSorting) return [3 /*break*/, 2];
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                resumeEventHandler = function () {
                                    console.log("Resolved, resuming now");
                                    resolve("Resume");
                                    document.querySelector("#start").removeEventListener("click", resumeEventHandler);
                                };
                                cancelEventHandler = function () {
                                    console.log("Rejected, cancel old sorting");
                                    reject("Cancel");
                                    document.querySelector("#refresh").removeEventListener("click", cancelEventHandler);
                                    document.querySelector("#sample-size").removeEventListener("change", cancelEventHandler);
                                    document.querySelector("#sort-method").removeEventListener("change", cancelEventHandler);
                                };
                                document.querySelector("#start").addEventListener("click", resumeEventHandler);
                                document.querySelector("#refresh").addEventListener("click", cancelEventHandler);
                                document.querySelector("#sample-size").addEventListener("change", cancelEventHandler);
                                document.querySelector("#sort-method").addEventListener("change", cancelEventHandler);
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ComparisonSort.prototype.updateDataset = function (dataset) {
        this.dataset = dataset;
    };
    ComparisonSort.prototype.swap = function (index1, index2) {
        // return if same
        if (index1 == index2) {
            return;
        }
        var temp = this.dataset[index1];
        this.dataset[index1] = this.dataset[index2];
        this.dataset[index2] = temp;
    };
    return ComparisonSort;
}());
var SelectionSort = /** @class */ (function (_super) {
    __extends(SelectionSort, _super);
    function SelectionSort() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectionSort.prototype.sort = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var i, minIndex, j, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.dataset.length)) return [3 /*break*/, 12];
                        minIndex = i;
                        j = i + 1;
                        _a.label = 2;
                    case 2:
                        if (!(j < this.dataset.length)) return [3 /*break*/, 9];
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.checkPause()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        return [2 /*return*/, []];
                    case 6:
                        if (this.dataset[j] < this.dataset[minIndex]) {
                            minIndex = j;
                        }
                        return [4 /*yield*/, callback(this.dataset, minIndex, j)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        ++j;
                        return [3 /*break*/, 2];
                    case 9:
                        this.swap(i, minIndex);
                        return [4 /*yield*/, callback(this.dataset, i, minIndex)];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        ++i;
                        return [3 /*break*/, 1];
                    case 12: return [2 /*return*/, this.dataset];
                }
            });
        });
    };
    return SelectionSort;
}(ComparisonSort));
var InsertionSort = /** @class */ (function (_super) {
    __extends(InsertionSort, _super);
    function InsertionSort() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InsertionSort.prototype.sort = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var i, j, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 1;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.dataset.length)) return [3 /*break*/, 9];
                        j = i;
                        _a.label = 2;
                    case 2:
                        if (!(j > 0 && this.dataset[j] < this.dataset[j - 1])) return [3 /*break*/, 8];
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.checkPause()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_2 = _a.sent();
                        return [2 /*return*/, []];
                    case 6: return [4 /*yield*/, callback(this.dataset, j, j - 1)];
                    case 7:
                        _a.sent();
                        this.swap(j, j - 1);
                        --j;
                        return [3 /*break*/, 2];
                    case 8:
                        ++i;
                        return [3 /*break*/, 1];
                    case 9: return [4 /*yield*/, callback(this.dataset, -1, -1)];
                    case 10:
                        _a.sent();
                        return [2 /*return*/, this.dataset];
                }
            });
        });
    };
    return InsertionSort;
}(ComparisonSort));
var BubbleSort = /** @class */ (function (_super) {
    __extends(BubbleSort, _super);
    function BubbleSort() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BubbleSort.prototype.sort = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var j, i, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        j = 0;
                        _a.label = 1;
                    case 1:
                        if (!(j < this.dataset.length)) return [3 /*break*/, 11];
                        i = 1;
                        _a.label = 2;
                    case 2:
                        if (!(i < this.dataset.length)) return [3 /*break*/, 10];
                        _a.label = 3;
                    case 3:
                        if (!(this.dataset[i] < this.dataset[i - 1])) return [3 /*break*/, 9];
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.checkPause()];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        e_3 = _a.sent();
                        return [2 /*return*/, []];
                    case 7: return [4 /*yield*/, callback(this.dataset, i - 1, i)];
                    case 8:
                        _a.sent();
                        this.swap(i, i - 1);
                        return [3 /*break*/, 3];
                    case 9:
                        ++i;
                        return [3 /*break*/, 2];
                    case 10:
                        ++j;
                        return [3 /*break*/, 1];
                    case 11: return [4 /*yield*/, callback(this.dataset, -1, -1)];
                    case 12:
                        _a.sent();
                        return [2 /*return*/, this.dataset];
                }
            });
        });
    };
    return BubbleSort;
}(ComparisonSort));
var HeapSort = /** @class */ (function (_super) {
    __extends(HeapSort, _super);
    function HeapSort() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.heapSize = 0;
        _this.heapSizeStartIndex = 0; // currently constantly at 0
        _this.processing = false;
        return _this;
    }
    /*
     *           1
     *         /   \
     *        2     3
     *       / \   / \
     *      4   5 6   7  ...
     */
    HeapSort.prototype.getHeapEnd = function () {
        // index of last element + 1
        return this.heapSizeStartIndex + this.heapSize;
    };
    HeapSort.prototype.getRightChildIndex = function (index) {
        var rightChildIndex = 2 * (index - this.heapSizeStartIndex + 1) + this.heapSizeStartIndex;
        return (rightChildIndex >= this.getHeapEnd()) ? NaN : rightChildIndex;
    };
    HeapSort.prototype.getLeftChildIndex = function (index) {
        var leftChildIndex = 2 * (index - this.heapSizeStartIndex + 1) + this.heapSizeStartIndex - 1;
        return (leftChildIndex >= this.getHeapEnd()) ? NaN : leftChildIndex;
    };
    HeapSort.prototype.getParentIndex = function (index) {
        var parentIndex = Math.floor((index - this.heapSizeStartIndex + 1) / 2) + this.heapSizeStartIndex - 1;
        return (parentIndex < this.heapSizeStartIndex) ? NaN : parentIndex;
    };
    HeapSort.prototype.getMinChildIndex = function (index) {
        var leftChildIndex = this.getLeftChildIndex(index);
        var rightChildIndex = this.getRightChildIndex(index);
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
    };
    HeapSort.prototype.pushToHeap = function (index) {
        ++this.heapSize;
        while (index >= this.heapSizeStartIndex) {
            var parentIndex = this.getParentIndex(index);
            if (this.dataset[index] < this.dataset[parentIndex])
                this.swap(index, parentIndex);
            index = parentIndex;
        }
    };
    HeapSort.prototype.popMinFromHeap = function () {
        --this.heapSize;
        // swap first (min) with last item
        this.swap(this.heapSizeStartIndex, this.heapSizeStartIndex + this.heapSize); // <= note that this doesn't belongs to the heap
        // move the min item to the last of the chart
        for (var i = this.heapSizeStartIndex + this.heapSize + 1; i < this.dataset.length; ++i) {
            this.swap(i, i - 1);
        }
        // adjust (balance) the heap
        var index = this.heapSizeStartIndex;
        while (index < this.heapSizeStartIndex + this.heapSize) {
            var minChildIndex = this.getMinChildIndex(index);
            if (isNaN(minChildIndex)) {
                break;
            }
            if (this.dataset[index] > this.dataset[minChildIndex]) {
                this.swap(index, minChildIndex);
                index = minChildIndex;
            }
            else {
                break;
            }
        }
    };
    HeapSort.prototype.sort = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var i, e_4, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.dataset.length)) return [3 /*break*/, 8];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.checkPause()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_4 = _a.sent();
                        return [2 /*return*/, []];
                    case 5:
                        this.pushToHeap(i);
                        return [4 /*yield*/, callback(this.dataset, i, -1)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        ++i;
                        return [3 /*break*/, 1];
                    case 8:
                        if (!(this.heapSize > 0)) return [3 /*break*/, 14];
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, this.checkPause()];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        e_5 = _a.sent();
                        return [2 /*return*/, []];
                    case 12:
                        this.popMinFromHeap();
                        return [4 /*yield*/, callback(this.dataset, this.dataset.length - 1, 0)];
                    case 13:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 14: return [2 /*return*/, this.dataset];
                }
            });
        });
    };
    return HeapSort;
}(ComparisonSort));
var MergeSort = /** @class */ (function (_super) {
    __extends(MergeSort, _super);
    function MergeSort() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MergeSort.prototype.mergeSortRecurHelper = function (first, last, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var mid, left, right, merge, i, j, e_6, k;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (first == last) {
                            return [2 /*return*/, 0]; // for inversion
                        }
                        mid = Math.floor((first + last) / 2);
                        return [4 /*yield*/, this.mergeSortRecurHelper(first, mid, callback)];
                    case 1:
                        left = _a.sent();
                        return [4 /*yield*/, this.mergeSortRecurHelper(mid + 1, last, callback)];
                    case 2:
                        right = _a.sent();
                        merge = 0;
                        i = first;
                        j = mid + 1;
                        _a.label = 3;
                    case 3:
                        if (!(i < j && j <= last)) return [3 /*break*/, 9];
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.checkPause()];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        e_6 = _a.sent();
                        return [2 /*return*/, []];
                    case 7: return [4 /*yield*/, callback(this.dataset, i, j)];
                    case 8:
                        _a.sent();
                        if (this.dataset[j] < this.dataset[i]) {
                            // j-th item is smaller than i-th item
                            // for inversion number
                            merge += mid - i;
                            // move j to i
                            for (k = j; k > i; --k) {
                                this.swap(k, k - 1);
                            }
                            // increment i and mid as first half is shifted by one index
                            ++i;
                            ++mid;
                            // point j to next item
                            ++j;
                        }
                        else {
                            // i-th item is smaller than j-th item
                            // point i to next item
                            ++i;
                        }
                        return [3 /*break*/, 3];
                    case 9: return [2 /*return*/, left + right + merge];
                }
            });
        });
    };
    MergeSort.prototype.getInversionNumber = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mergeSortRecurHelper(0, this.dataset.length - 1, function () { })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MergeSort.prototype.sort = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mergeSortRecurHelper(0, this.dataset.length - 1, callback)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, callback(this.dataset, -1, -1)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.dataset];
                }
            });
        });
    };
    return MergeSort;
}(ComparisonSort));
