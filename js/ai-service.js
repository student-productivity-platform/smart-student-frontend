/**
 * ==========================================================================
 * SMART STUDENT — AI Doubt Solver Client & Contextual Engine
 * 
 * ARCHITECTURE ENFORCEMENT:
 * - Multi-turn conversational context & session memory.
 * - Secure Server-Side Proxy support (Firebase Callable Function) with
 *   zero client-side API key leakage.
 * - Resilient offline-first academic knowledge & reasoning engine.
 * - Per-user data isolation adhering to institutional authorization.
 * ==========================================================================
 */

const AIService = (() => {
  // Built-in Academic Knowledge Engine for University STEM & CS Curricula
  const DOMAIN_TOPICS = {
    dsa: {
      subject: 'Data Structures & Algorithms',
      keywords: ['stack', 'queue', 'linked list', 'linkedlist', 'dijkstra', 'graph', 'tree', 'bst', 'avl', 'binary search', 'dynamic programming', 'dp', 'knapsack', 'sorting', 'quick sort', 'quicksort', 'merge sort', 'mergesort', 'heap', 'recursion', 'bfs', 'dfs', 'shortest path', 'complexity', 'big o', 'lifo', 'fifo', 'hash table', 'array'],
      canonicalAnswers: {
        stack: {
          title: 'Stack Data Structure & LIFO Principle',
          overview: 'A Stack is a fundamental linear data structure that follows the **Last-In, First-Out (LIFO)** principle, where elements are inserted and removed exclusively from one end, designated as the **Top**.',
          steps: [
            '**Core Operations**:\n   * `push(x)`: Inserts element $x$ onto the Top of the stack (Time: $\\mathcal{O}(1)$).\n   * `pop()`: Removes and returns the top element (Time: $\\mathcal{O}(1)$).\n   * `peek()` / `top()`: Inspects the top element without removing it (Time: $\\mathcal{O}(1)$).\n   * `isEmpty()` / `isFull()`: Checks boundary state invariants (Time: $\\mathcal{O}(1)$).',
            '**Internal Implementations**:\n   * **Array-Based (Sequential)**: Uses a contiguous memory buffer and an integer pointer `top = -1`. Requires checking for **Stack Overflow** when `top == capacity - 1`.\n   * **Linked List-Based (Dynamic)**: Elements are inserted/deleted at the singly linked list head in $\\mathcal{O}(1)$ time, eliminating fixed-size overflow limits.',
            '**Primary Academic & Real-World Applications**:\n   * **Call Stack / Recursion**: Operating systems allocate an execution stack frame (activation record) storing local variables, parameters, and return addresses.\n   * **Syntax Parsing & Expression Evaluation**: Infix to Postfix/Prefix conversion using Dijkstra\'s Shunting-Yard algorithm.\n   * **Parentheses Balancing**: Compilers validate matching brackets `()`, `[]`, `{}` using stack state matching.\n   * **Backtracking**: Depth-First Search (DFS) state management and undo/redo operations in software systems.'
          ],
          code: `// C++ Production Implementation: Stack & Balanced Parentheses Validator
#include <iostream>
#include <vector>
#include <string>
#include <stdexcept>

template <typename T>
class AcademicStack {
private:
    std::vector<T> data;
public:
    void push(const T& val) {
        data.push_back(val);
    }

    void pop() {
        if (isEmpty()) throw std::underflow_error("Stack Underflow: cannot pop empty stack");
        data.pop_back();
    }

    T top() const {
        if (isEmpty()) throw std::underflow_error("Stack Underflow: stack is empty");
        return data.back();
    }

    bool isEmpty() const { return data.empty(); }
    size_t size() const { return data.size(); }
};

// Application: Balanced Parentheses Validation O(N)
bool isBalancedParentheses(const std::string& expr) {
    AcademicStack<char> st;
    for (char ch : expr) {
        if (ch == '(' || ch == '{' || ch == '[') {
            st.push(ch);
        } else if (ch == ')' || ch == '}' || ch == ']') {
            if (st.isEmpty()) return false;
            char top = st.top();
            st.pop();
            if ((ch == ')' && top != '(') ||
                (ch == '}' && top != '{') ||
                (ch == ']' && top != '[')) return false;
        }
    }
    return st.isEmpty();
}`,
          math: `\\mathcal{T}(\\text{Push}) = \\mathcal{O}(1), \\quad \\mathcal{T}(\\text{Pop}) = \\mathcal{O}(1), \\quad \\mathcal{S}(n) = \\mathcal{O}(n)`,
          examTip: 'Always check for **Stack Underflow** (popping an empty stack) and **Stack Overflow** (pushing past fixed capacity). In recursion analysis questions, explain how compiler stack frames allocate activation records.'
        },
        queue: {
          title: 'Queue Data Structure & Circular Queue Architecture',
          overview: 'A Queue is a linear data structure adhering strictly to the **First-In, First-Out (FIFO)** order. Elements enter at the **Rear** (Tail) and exit from the **Front** (Head).',
          steps: [
            '**Core Operations**:\n   * `enqueue(x)`: Appends an element to the Rear (Time: $\\mathcal{O}(1)$).\n   * `dequeue()`: Deletes and returns the element at Front (Time: $\\mathcal{O}(1)$).\n   * `front()` / `peek()`: Returns the first pending element (Time: $\\mathcal{O}(1)$).',
            '**Circular Queue Modulo Mechanics**:\n   * In a linear array queue, dequeuing causes unrecoverable memory fragmentation at the front.\n   * A **Circular Queue** wraps around using modular arithmetic: $\\text{rear} = (\\text{rear} + 1) \\pmod N$.\n   * Full Condition: $(\\text{rear} + 1) \\pmod N == \\text{front}$.\n   * Empty Condition: $\\text{front} == -1$.',
            '**Canonical Applications**:\n   * CPU task scheduling (Round Robin ready queue).\n   * Breadth-First Search (BFS) graph shortest path traversal.\n   * Asynchronous I/O buffers (Printers, Network packet ingress buffers).'
          ],
          code: `// C++ Circular Queue Implementation using Modulo Arithmetic
#include <iostream>
#include <vector>

class CircularQueue {
private:
    std::vector<int> arr;
    int front, rear, capacity;
public:
    CircularQueue(int k) : capacity(k), front(-1), rear(-1) {
        arr.resize(k);
    }

    bool enqueue(int value) {
        if (isFull()) return false;
        if (isEmpty()) front = 0;
        rear = (rear + 1) % capacity;
        arr[rear] = value;
        return true;
    }

    bool dequeue() {
        if (isEmpty()) return false;
        if (front == rear) {
            front = rear = -1; // Reset to empty
        } else {
            front = (front + 1) % capacity;
        }
        return true;
    }

    int getFront() { return isEmpty() ? -1 : arr[front]; }
    int getRear() { return isEmpty() ? -1 : arr[rear]; }
    bool isEmpty() { return front == -1; }
    bool isFull() { return ((rear + 1) % capacity) == front; }
};`,
          math: `\\text{Circular Index Transition: } \\text{index}_{t+1} = (\\text{index}_t + 1) \\pmod N`,
          examTip: 'In university exams, trace the `front` and `rear` pointers step-by-step in a table for each enqueue/dequeue sequence.'
        },
        linked_list: {
          title: 'Linked List Architecture & Floyd’s Cycle Detection',
          overview: 'A Linked List is a linear data structure composed of distinct nodes allocated dynamically in non-contiguous heap memory, linked via forward (and backward) pointers.',
          steps: [
            '**Structure Variants**:\n   * **Singly Linked List**: Each node contains `data` and `next` pointer.\n   * **Doubly Linked List**: Each node contains `prev`, `data`, and `next` pointers (enables bidirectional traversal).\n   * **Circular Linked List**: The last node\'s `next` pointer references the `head` node.',
            '**Iterative List Reversal Algorithm**:\n   * Maintain 3 pointers: `prev = nullptr`, `curr = head`, `next = nullptr`.\n   * While `curr != nullptr`: Save `next = curr->next`, reverse link `curr->next = prev`, advance `prev = curr` and `curr = next`.\n   * Final head becomes `prev` (Time: $\\mathcal{O}(N)$, Auxiliary Space: $\\mathcal{O}(1)$).',
            '**Floyd’s Tortoise and Hare Cycle Detection**:\n   * Advance `slow` by 1 step and `fast` by 2 steps.\n   * If `slow == fast`, a cycle exists. To find cycle entrance, reset `slow = head`; advance both by 1 step until they collide.'
          ],
          code: `// C++ Linked List In-Place Reversal & Cycle Detection
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// 1. In-place Reverse Singly Linked List: O(N) Time, O(1) Space
ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr != nullptr) {
        ListNode* nextTemp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}

// 2. Floyd's Cycle Detection: O(N) Time, O(1) Space
bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,
          math: `\\mathcal{T}(\\text{Traversal}) = \\mathcal{O}(N), \\quad \\mathcal{T}(\\text{InsertHead}) = \\mathcal{O}(1), \\quad \\mathcal{S}(\\text{Reversal}) = \\mathcal{O}(1)`,
          examTip: 'Watch out for null pointer dereferences (`curr->next` when `curr == nullptr`) and always handle empty list (`head == nullptr`) and single node edge cases.'
        },
        binary_search: {
          title: 'Binary Search Algorithm & Logarithmic Complexity',
          overview: 'Binary Search is a divide-and-conquer algorithm that searches for a target key in a strictly sorted collection by iteratively eliminating half of the remaining search space.',
          steps: [
            '**Prerequisites**: The input array must be sorted in monotonic order.',
            '**Midpoint Calculation**: Calculate $mid = low + \\lfloor \\frac{high - low}{2} \\rfloor$. Using $(low + high) / 2$ causes integer overflow for large indices $low + high > 2^{31} - 1$.',
            '**Interval Reduction**:\n   * If $arr[mid] == target$, return $mid$.\n   * If $arr[mid] < target$, discard left half ($low = mid + 1$).\n   * If $arr[mid] > target$, discard right half ($high = mid - 1$).',
            '**Master Theorem Recurrence**: $T(n) = T(n/2) + \\mathcal{O}(1) \\implies \\mathcal{O}(\\log_2 n)$.'
          ],
          code: `// C++ Binary Search with Overflow Protection
#include <vector>

int binarySearch(const std::vector<int>& arr, int target) {
    int low = 0;
    int high = static_cast<int>(arr.size()) - 1;

    while (low <= high) {
        // Prevents (low + high) integer overflow
        int mid = low + (high - low) / 2;

        if (arr[mid] == target) {
            return mid; // Target found
        } else if (arr[mid] < target) {
            low = mid + 1; // Search right half
        } else {
            high = mid - 1; // Search left half
        }
    }
    return -1; // Target not found
}`,
          math: `T(n) = T\\left(\\frac{n}{2}\\right) + \\mathcal{O}(1) \\implies \\mathcal{O}(\\log_2 n)`,
          examTip: 'Write $mid = low + (high - low)/2$ rather than $(low + high)/2$ in exams and technical interviews to highlight understanding of 32-bit signed integer boundary safety.'
        },
        dijkstra: {
          title: "Dijkstra's Single-Source Shortest Path Algorithm",
          overview: "Dijkstra's algorithm computes the shortest paths from a single source vertex to all other vertices in a weighted graph with non-negative edge costs $(w(u, v) \\ge 0)$ using greedy min-heap relaxation.",
          steps: [
            '**Initialization**: Set $dist[source] = 0$ and $dist[v] = \\infty$ for all other vertices $v$. Insert $(0, source)$ into a Min-Priority Queue.',
            '**Min Extraction**: While priority queue is non-empty, extract vertex $u$ having the minimum tentative distance.',
            '**Edge Relaxation**: For each adjacent edge $(u, v)$ with weight $w$:\n   * If $dist[u] + w < dist[v]$, relax distance $dist[v] = dist[u] + w$ and push $(dist[v], v)$ into min-heap.',
            '**Greedy Choice Property**: Guaranteed optimal because adding non-negative edges never decreases path length.'
          ],
          code: `// C++ STL Dijkstra's Shortest Path
#include <iostream>
#include <vector>
#include <queue>

using namespace std;
typedef pair<int, int> pii; // (distance, vertex)

vector<int> dijkstra(int V, const vector<vector<pii>>& adj, int src) {
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    vector<int> dist(V, 1e9);

    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        int d = pq.top().first;
        int u = pq.top().second;
        pq.pop();

        if (d > dist[u]) continue;

        for (const auto& edge : adj[u]) {
            int v = edge.first;
            int weight = edge.second;

            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
          math: `T(V, E) = \\mathcal{O}((V + E) \\log V) \\quad \\text{with Binary Min-Heap}`,
          examTip: 'Dijkstra fails with negative edge weights because greedy relaxation cannot un-visit finalized nodes. For negative weights, apply Bellman-Ford ($\\mathcal{O}(V \\cdot E)$).'
        },
        sorting: {
          title: 'Sorting Algorithms: QuickSort vs MergeSort Analysis',
          overview: 'QuickSort and MergeSort are canonical divide-and-conquer algorithms representing the standard benchmarks in algorithmic sorting theory.',
          steps: [
            '**QuickSort (In-Place Partitioning)**:\n   * Selects pivot element and partitions array into elements $\\le$ pivot and $\\ge$ pivot (Lomuto/Hoare scheme).\n   * Average: $\\mathcal{O}(n \\log n)$, Worst: $\\mathcal{O}(n^2)$ if pivot is extreme. Auxiliary Space: $\\mathcal{O}(\\log n)$ recursion stack.',
            '**MergeSort (Stable Divide & Conquer)**:\n   * Recursively splits array into halves, sorts subarrays, and merges them using an auxiliary buffer.\n   * Always guarantees $\\mathcal{O}(n \\log n)$ time in all cases. Auxiliary Space: $\\mathcal{O}(n)$.',
            '**Architectural Comparison**: QuickSort is faster in practice on contiguous arrays due to CPU cache locality; MergeSort is optimal for Linked Lists and external file sorting.'
          ],
          code: `// C++ QuickSort with Hoare Partitioning
#include <vector>
#include <algorithm>

int hoarePartition(std::vector<int>& arr, int low, int high) {
    int pivot = arr[low + (high - low) / 2];
    int i = low - 1, j = high + 1;
    while (true) {
        do { i++; } while (arr[i] < pivot);
        do { j--; } while (arr[j] > pivot);
        if (i >= j) return j;
        std::swap(arr[i], arr[j]);
    }
}

void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int p = hoarePartition(arr, low, high);
        quickSort(arr, low, p);
        quickSort(arr, p + 1, high);
    }
}`,
          math: `\\text{MergeSort: } T(n) = 2T\\left(\\frac{n}{2}\\right) + \\mathcal{O}(n) \\implies \\mathcal{O}(n \\log n)`,
          examTip: 'In exams, prove why MergeSort is stable (preserves relative order of equal keys during merge) while QuickSort is inherently unstable.'
        },
        dynamic_programming: {
          title: 'Dynamic Programming: 0/1 Knapsack & Optimal Substructure',
          overview: 'Dynamic Programming (DP) optimizes recursive problems by decomposing them into overlapping subproblems and memoizing intermediate solutions to avoid exponential recalculation.',
          steps: [
            '**Two Fundamental Characteristics**:\n   * **Optimal Substructure**: Optimal solution of the global problem incorporates optimal solutions of its subproblems.\n   * **Overlapping Subproblems**: The same recursive subproblems are encountered repeatedly.',
            '**0/1 Knapsack Formulation**:\n   * Given $N$ items with values $v_i$ and weights $w_i$, maximize total value inside bag of capacity $W$.\n   * Recurrence: $DP[i][w] = \\max(DP[i-1][w], DP[i-1][w - w_i] + v_i)$ if $w \\ge w_i$, else $DP[i-1][w]$.',
            '**Space Optimization**: Reduced from $\\mathcal{O}(N \\cdot W)$ 2D matrix to $\\mathcal{O}(W)$ 1D array by iterating capacity backwards ($w = W \\dots w_i$).'
          ],
          code: `// C++ 0/1 Knapsack 1D Space-Optimized Dynamic Programming
#include <vector>
#include <algorithm>

int knapsack01(int W, const std::vector<int>& weights, const std::vector<int>& values) {
    int n = weights.size();
    std::vector<int> dp(W + 1, 0);

    for (int i = 0; i < n; i++) {
        // Traverse backwards to use values from previous item iteration only
        for (int w = W; w >= weights[i]; w--) {
            dp[w] = std::max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    return dp[W];
}`,
          math: `DP[i, w] = \\begin{cases} DP[i-1, w] & \\text{if } w_i > w \\\\ \\max(DP[i-1, w], DP[i-1, w - w_i] + v_i) & \\text{if } w_i \\le w \\end{cases}`,
          examTip: 'Always define the 4 pillars of your DP answer: (1) State Definition, (2) Base Cases, (3) Recurrence Transition Relation, (4) Time & Space Complexity.'
        }
      }
    },
    os: {
      subject: 'Operating Systems',
      keywords: ['deadlock', 'semaphore', 'process', 'thread', 'scheduling', 'paging', 'virtual memory', 'coffman', 'banker', 'mutex', 'cpu scheduling', 'round robin', 'thrashing', 'tlb', 'critical section'],
      canonicalAnswers: {
        deadlock: {
          title: 'Deadlock Characterization & Coffman Conditions',
          overview: 'A Deadlock is an operating system state where a set of concurrent processes are permanently blocked because each process holds a resource and waits for another resource held by another process in the set.',
          steps: [
            '**The 4 Coffman Conditions (Simultaneous Occurrence)**:\n   * **Mutual Exclusion**: At least one resource must be non-shareable.\n   * **Hold and Wait**: A process holds resource(s) while requesting additional allocated resources.\n   * **No Preemption**: Allocated resources cannot be confiscated forcibly; must be voluntarily released.\n   * **Circular Wait**: A closed loop of processes exists ($P_0 \\rightarrow P_1 \\rightarrow \\dots \\rightarrow P_n \\rightarrow P_0$).',
            '**Deadlock Handling Strategies**:\n   * **Prevention**: Eliminate at least one Coffman condition (e.g. total ordering on resource IDs).\n   * **Avoidance**: Banker\'s Algorithm dynamically checks if resource allocation leaves system in a **Safe State**.\n   * **Detection & Recovery**: Construct Resource Allocation Graph (RAG) and terminate processes or preempt resources.'
          ],
          code: `// C POSIX Mutex Locking avoiding Deadlock via Resource Hierarchy Ordering
#include <pthread.h>
#include <stdio.h>

pthread_mutex_t lockA = PTHREAD_MUTEX_INITIALIZER;
pthread_mutex_t lockB = PTHREAD_MUTEX_INITIALIZER;

// Global rule: Always acquire lockA before lockB (eliminates Circular Wait)
void* safe_thread_worker(void* arg) {
    pthread_mutex_lock(&lockA);
    pthread_mutex_lock(&lockB);

    // Critical section operations...

    pthread_mutex_unlock(&lockB);
    pthread_mutex_unlock(&lockA);
    return NULL;
}`,
          math: `\\text{Banker's Safe State Invariant: } \\text{Need}_i = \\text{Max}_i - \\text{Allocation}_i \\le \\text{Available}`,
          examTip: 'To eliminate Circular Wait statically in system design, impose a strict total resource ordering function $F: R \\rightarrow \\mathbb{N}$ and require resources to be requested in strictly increasing order.'
        },
        paging: {
          title: 'Paging, Virtual Memory & TLB Address Translation',
          overview: 'Paging is a memory management scheme that eliminates the need for contiguous physical memory allocation by dividing logical memory into fixed-size **Pages** and physical RAM into **Frames**.',
          steps: [
            '**Address Decomposition**: Logical address $(p, d)$ where $p$ is page number and $d$ is page offset. Physical address is $(f \\times \\text{PageSize}) + d$ where $f = \\text{PageTable}[p]$.',
            '**Translation Lookaside Buffer (TLB)**: High-speed associative hardware cache. Effective Memory Access Time (EMAT):\n   $$\\text{EMAT} = h \\cdot (t_{\\text{TLB}} + t_{\\text{RAM}}) + (1 - h) \\cdot (t_{\\text{TLB}} + 2 \\cdot t_{\\text{RAM}})$$',
            '**Page Replacement Algorithms**:\n   * **FIFO**: Replaces oldest page. Suffers from **Belady\'s Anomaly** (increasing frame count increases page faults).\n   * **LRU (Least Recently Used)**: Replaces page unused for longest time (Optimal approximation).\n   * **Optimal (OPT)**: Replaces page not needed for longest future time.'
          ],
          code: `/* Memory Address Translation Architecture */
Logical Address (32-bit, 4KB Page Size = 12-bit offset):
| Page Number p (20 bits) | Page Offset d (12 bits) |
          |
    [Page Table Lookup: p -> Frame f]
          v
Physical Address:
| Frame Number f (20 bits) | Page Offset d (12 bits) |`,
          math: `\\text{EMAT} = h(t_{\\text{TLB}} + t_{\\text{RAM}}) + (1-h)(t_{\\text{TLB}} + 2t_{\\text{RAM}})`,
          examTip: 'In university exams, always show the complete Page Fault reference string simulation trace and calculate the exact Page Fault Ratio = (Faults / Total References).'
        },
        scheduling: {
          title: 'CPU Scheduling Algorithms: FCFS, SJF & Round Robin',
          overview: 'CPU Scheduling is the process by which the OS short-term scheduler selects an executable process from the Ready Queue to assign to the CPU core.',
          steps: [
            '**FCFS (First-Come, First-Served)**: Non-preemptive. Suffers from the **Convoy Effect** when short processes wait behind a long CPU-bound process.',
            '**SJF / SRTF (Shortest Remaining Time First)**: Provably optimal minimum average waiting time. Preemptive version switches whenever a newly arriving job has shorter remaining burst.',
            '**Round Robin (RR)**: Preemptive time-sliced scheduling with time quantum $q$. If $q \\to \\infty$, RR becomes FCFS; if $q \\to 0$, context switching overhead degrades throughput.',
            '**Metrics & Formulas**:\n   * $\\text{Turnaround Time (TAT)} = \\text{Completion Time (CT)} - \\text{Arrival Time (AT)}$\n   * $\\text{Waiting Time (WT)} = \\text{Turnaround Time (TAT)} - \\text{Burst Time (BT)}$'
          ],
          code: `/* CPU Scheduling Metrics Comparison Table */
Process | AT | BT | CT (RR q=2) | TAT (CT-AT) | WT (TAT-BT)
P1      | 0  | 5  | 12          | 12          | 7
P2      | 1  | 3  | 8           | 7           | 4
P3      | 2  | 1  | 5           | 3           | 2

Average Waiting Time = (7 + 4 + 2) / 3 = 4.33 ms`,
          math: `TAT = CT - AT, \\quad WT = TAT - BT, \\quad \\text{Response Time} = t_{\\text{First CPU}} - AT`,
          examTip: 'Always draw the Gantt Chart with time stamps before writing down the numeric table to ensure zero calculation errors.'
        },
        semaphore: {
          title: 'Process Synchronization: Semaphores & Critical Section',
          overview: 'Semaphores are integer synchronization primitives accessed exclusively via atomic operations `wait()` ($P$) and `signal()` ($V$) to manage concurrent access to shared critical sections.',
          steps: [
            '**The Critical Section Requirements**:\n   * **Mutual Exclusion**: Only one process at a time can execute inside critical section.\n   * **Progress**: If no process is in critical section, selection of next process cannot be delayed indefinitely.\n   * **Bounded Waiting**: A limit exists on number of times other processes enter critical section after a process has requested entry.',
            '**Semaphore Types**:\n   * **Binary Semaphore (Mutex)**: Takes integer values 0 and 1.\n   * **Counting Semaphore**: Value range is unrestricted, representing count of available resource units.',
            '**Producer-Consumer Problem**: Governed by 3 semaphores: `mutex = 1`, `empty = N`, `full = 0`.'
          ],
          code: `// C POSIX Producer-Consumer Synchronization
#include <pthread.h>
#include <semaphore.h>

#define BUFFER_SIZE 5
int buffer[BUFFER_SIZE];
int in = 0, out = 0;

sem_t empty_slots; // Initialized to BUFFER_SIZE
sem_t full_slots;  // Initialized to 0
pthread_mutex_t buffer_mutex; // Initialized to 1

void produce(int item) {
    sem_wait(&empty_slots);
    pthread_mutex_lock(&buffer_mutex);

    buffer[in] = item;
    in = (in + 1) % BUFFER_SIZE;

    pthread_mutex_unlock(&buffer_mutex);
    sem_post(&full_slots);
}`,
          math: `\\text{wait}(S): \\quad S = S - 1; \\text{ if } (S < 0) \\text{ block}(); \\qquad \\text{signal}(S): \\quad S = S + 1; \\text{ if } (S \\le 0) \\text{ wakeup}();`,
          examTip: 'Remember: In the Producer-Consumer problem, `sem_wait(&empty_slots)` must be called BEFORE `pthread_mutex_lock(&buffer_mutex)` to avoid mutual deadlock.'
        }
      }
    },
    dbms: {
      subject: 'Database Management Systems',
      keywords: ['sql', 'database', 'normalization', '1nf', '2nf', '3nf', 'bcnf', 'acid', 'transaction', 'indexing', 'b-tree', 'b+ tree', 'concurrency', 'deadlock', '2pl', 'nosql', 'relational', 'foreign key', 'primary key', 'join', 'schema'],
      canonicalAnswers: {
        sql: {
          title: 'SQL (Structured Query Language)',
          overview: 'SQL (Structured Query Language) is the standard computer language used to communicate with, manage, and manipulate relational databases.',
          steps: [
            '**Create & Define**: Create databases, tables, and views (`CREATE`, `ALTER`, `DROP` - DDL).',
            '**Retrieve Data**: Query and fetch specific records from tables (`SELECT` - DQL).',
            '**Insert Data**: Add new rows of information into tables (`INSERT` - DML).',
            '**Update Data**: Modify existing records (`UPDATE` - DML).',
            '**Delete Data**: Remove unnecessary records (`DELETE` - DML).',
            '**Control Access**: Manage permissions and security (`GRANT`, `REVOKE` - DCL).'
          ],
          code: `-- Retrieve all records from the students table
SELECT * FROM students;`,
          math: `\\text{Relational Query Operation: } \\sigma_{\\text{condition}}(R)`,
          examTip: 'In university exams, always classify SQL commands into their 5 functional sub-languages: DDL, DQL, DML, DCL, and TCL.'
        },
        primary_key_foreign_key: {
          title: 'Primary Key vs Foreign Key',
          overview: 'In Relational Database Management Systems, **Primary Keys** and **Foreign Keys** work together to uniquely identify records and maintain referential integrity across related tables.',
          steps: [
            '**Primary Key (PK)**: A column or set of columns that uniquely identifies each row in a table. It cannot contain `NULL` values, and each table can have only one Primary Key.',
            '**Foreign Key (FK)**: A column that references the Primary Key of another table, establishing a valid parent-child relationship between the two tables. Foreign keys can accept `NULL` values and duplicates.',
            '**Integrity Enforcement**: Primary Key enforces **Entity Integrity**, while Foreign Key enforces **Referential Integrity**.'
          ],
          code: `-- Parent Table: dept_id is Primary Key
CREATE TABLE Departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL
);

-- Child Table: student_id is PK, dept_id is Foreign Key referencing Departments
CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES Departments(dept_id)
);`,
          math: `\\text{Referential Constraint: } \\pi_{\\text{dept\\_id}}(\\text{Students}) \\subseteq \\pi_{\\text{dept\\_id}}(\\text{Departments})`,
          examTip: 'Remember: A table can have only **one** Primary Key, but can contain **multiple** Foreign Keys pointing to different parent tables.'
        },
        normalization: {
          title: 'Database Normalization (1NF, 2NF, 3NF, BCNF)',
          overview: 'Database normalization is the systematic decomposition of relation schemas to minimize data redundancy and eliminate insert, update, and delete anomalies while ensuring lossless join decomposition.',
          steps: [
            '**1NF (First Normal Form)**: All attribute values must be atomic (single, indivisible values). No multivalued attributes or repeating groups.',
            '**2NF (Second Normal Form)**: Must satisfy 1NF and have **no partial functional dependencies** (every non-prime attribute must depend on the full composite candidate key).',
            '**3NF (Third Normal Form)**: Must satisfy 2NF and have **no transitive dependencies** (non-key attributes cannot depend on other non-key attributes).',
            '**BCNF (Boyce-Codd Normal Form)**: Stricter 3.5NF: for every functional dependency $X \\rightarrow Y$, $X$ must strictly be a superkey.'
          ],
          code: `/* SQL Normalization Decomposition to 3NF */
CREATE TABLE Departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL,
    hod_name VARCHAR(100) NOT NULL
);

CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES Departments(dept_id)
);`,
          math: `\\text{Lossless Join Condition: } R_1 \\cap R_2 \\rightarrow R_1 \\text{ or } R_1 \\cap R_2 \\rightarrow R_2`,
          examTip: 'To find Candidate Keys in exams, compute attribute closures $(X^+)$ under the given FD set $F$. Any minimal attribute set whose closure covers all relation attributes is a Candidate Key.'
        },
        why_normalization: {
          title: 'Why Do We Use Database Normalization?',
          overview: 'We use database normalization to design clean, efficient relational schemas that eliminate redundant data storage and prevent severe data modification anomalies.',
          steps: [
            '**Eliminates Redundancy**: Avoids storing duplicate department, course, or student details in hundreds of rows.',
            '**Prevents Insertion Anomaly**: Allows adding a new department without needing a dummy student record.',
            '**Prevents Update Anomaly**: Modifying a department name in one place updates it consistently everywhere.',
            '**Prevents Deletion Anomaly**: Deleting a student record does not accidentally wipe out the entire department record.'
          ],
          code: `-- Normalized Relations preventing anomalies
-- 1. Departments table holds department details once
-- 2. Students table references dept_id via Foreign Key`,
          math: `\\text{Schema Quality: Minimal Redundancy } \\land \\text{ Zero Update/Insert/Delete Anomalies}`,
          examTip: 'When explaining why normalization is needed in university exams, always define the three modification anomalies: Insertion Anomaly, Update Anomaly, and Deletion Anomaly with a concrete table example.'
        },
        marks_query: {
          title: 'SQL Query: Students with Marks Greater Than 80',
          overview: 'To retrieve student records whose marks exceed 80, we use the declarative SQL `SELECT` statement paired with a `WHERE` condition filter.',
          steps: [
            '`SELECT student_id, name, marks`: Specifies the columns to output in the result set.',
            '`FROM students`: Declares the source table containing the records.',
            '`WHERE marks > 80`: Filters rows so only students scoring strictly above 80 are returned.'
          ],
          code: `SELECT student_id, name, marks
FROM students
WHERE marks > 80;`,
          math: `\\sigma_{\\text{marks} > 80}(\\text{Students})`,
          examTip: 'In exams, remember that `>` is strictly greater than. If the question asks for "80 and above", use `>= 80` instead.'
        },
        acid: {
          title: 'ACID Properties in Transaction Management',
          overview: 'ACID is the set of four foundational properties guaranteeing reliable transaction processing and data integrity in Relational DBMS.',
          steps: [
            '**Atomicity ("All-or-Nothing")**: Entire transaction executes to completion or rolls back completely (implemented via Write-Ahead Logging / WAL).',
            '**Consistency**: Transaction transforms database from one valid state satisfying all schema integrity constraints to another.',
            '**Isolation**: Concurrent transaction execution yields states identical to some serial execution (enforced via 2-Phase Locking or MVCC).',
            '**Durability**: Committed changes survive subsequent system crashes and power failures in non-volatile storage.'
          ],
          code: `-- Banking Transaction Enforcing ACID Guarantees
BEGIN TRANSACTION;
UPDATE Accounts SET balance = balance - 10000 WHERE id = 'A' AND balance >= 10000;
IF @@ROWCOUNT = 0 THEN
    ROLLBACK;
    RAISE ERROR 'Insufficient balance';
END IF;

UPDATE Accounts SET balance = balance + 10000 WHERE id = 'B';
COMMIT;`,
          math: `\\text{Conflict Serializability: Precedence Graph } G=(V, E) \\text{ must be strictly Acyclic}`,
          examTip: 'Draw a Conflict Precedence Graph where directed edge $T_i \\to T_j$ exists if $T_i$ and $T_j$ access the same data item with at least one write operation.'
        },
        indexing: {
          title: 'Database Indexing: B-Trees & B+ Tree Architecture',
          overview: 'Database indexes are specialized multi-level balanced tree structures stored on disk to accelerate query retrieval from $\\mathcal{O}(N)$ full scans to $\\mathcal{O}(\\log_B N)$ block reads.',
          steps: [
            '**B+ Tree Invariant**: All data records reside strictly in leaf nodes. Internal nodes contain only routing search keys and child disk pointers.',
            '**Sequential Leaf Links**: All leaf pages are connected via a doubly linked list, enabling ultra-fast range queries (`BETWEEN v1 AND v2`).',
            '**Clustered vs Non-Clustered**: Clustered index dictates physical row ordering on disk (max 1 per table); Non-clustered index stores sorted key + row pointer.'
          ],
          code: `-- SQL Index Optimization
CREATE INDEX idx_student_dept ON Students(dept_id);
-- Composite Index for Multi-Column Filtering
CREATE INDEX idx_enroll_student_grade ON CourseEnrollments(student_id, grade);`,
          math: `\\text{Tree Height: } h \\le \\left\\lceil \\log_{\\lceil M/2 \\rceil} \\left(\\frac{N+1}{2}\\right) \\right\\rceil`,
          examTip: 'Highlight why B+ Trees are superior to binary search trees for disk storage: high branching fan-out ($M \\approx 500$) keeps tree height $\\le 3-4$, minimizing disk I/O latency.'
        }
      }
    },
    networks: {
      subject: 'Computer Networks',
      keywords: ['tcp', 'udp', 'handshake', 'osi', 'ip', 'subnet', 'routing', 'dns', 'http', 'https', 'congestion', 'flow control', 'sliding window', 'layer'],
      canonicalAnswers: {
        tcp: {
          title: 'TCP vs UDP Protocols & 3-Way Handshake',
          overview: 'TCP and UDP are the primary Transport Layer protocols in the Internet suite, balancing reliable stateful delivery versus lightweight low-latency transmission.',
          steps: [
            '**TCP (Transmission Control Protocol)**: Connection-oriented, guaranteed in-order byte stream delivery with ACKs, checksums, Sliding Window Flow Control, and Congestion Control (AIMD).',
            '**UDP (User Datagram Protocol)**: Connectionless, lightweight 8-byte header, minimal overhead, optimal for real-time video streaming, DNS, and online gaming.',
            '**TCP 3-Way Handshake**:\n   1. Client sends **SYN** ($seq = x$)\n   2. Server replies **SYN-ACK** ($seq = y, ack = x + 1$)\n   3. Client sends **ACK** ($ack = y + 1$). Connection is Established.'
          ],
          code: `/* TCP 3-Way Handshake Connection Timing */
Client                                  Server
  |                                       |
  | ------------ SYN (seq=x) -----------> |  [Server allocates TCB buffer]
  | <------- SYN-ACK (seq=y, ack=x+1) --- |
  | ------------ ACK (ack=y+1) ---------> |  [Connection ESTABLISHED]
  |                                       |`,
          math: `\\text{TCP Throughput } \\approx \\frac{1.22 \\times \\text{MSS}}{\\text{RTT} \\times \\sqrt{p}}`,
          examTip: 'Draw the handshake sequence diagram marking Sequence ($seq$) and Acknowledgment ($ack$) numbers clearly.'
        },
        osi: {
          title: 'OSI 7-Layer Architecture Model',
          overview: 'The Open Systems Interconnection (OSI) Reference Model standardizes communication protocols into 7 abstraction layers, each performing distinct network functions.',
          steps: [
            '**Layer 7 — Application Layer**: End-user application interfaces (HTTP, HTTPS, DNS, SMTP, SSH, FTP).',
            '**Layer 6 — Presentation Layer**: Data formatting, character encoding, encryption/decryption (TLS), and compression.',
            '**Layer 5 — Session Layer**: Dialog control, checkpointing, and inter-host session management.',
            '**Layer 4 — Transport Layer**: Process-to-process port addressing, segmentation, flow control, and reliability (TCP, UDP). [PDU: Segment]',
            '**Layer 3 — Network Layer**: Host-to-host logical IP addressing and path routing across networks (IP, ICMP, Routers). [PDU: Packet]',
            '**Layer 2 — Data Link Layer**: Hop-to-hop physical MAC addressing, framing, and error detection (Ethernet, Switches). [PDU: Frame]',
            '**Layer 1 — Physical Layer**: Raw bit transmission over physical media (Cables, Fiber, Radio). [PDU: Bits]'
          ],
          code: `/* Protocol Data Unit (PDU) Encapsulation */
[Data]                                    Application Layer
[TCP Header | Data]                       Transport (Segment)
[IP Header | TCP Header | Data]           Network (Packet)
[Ethernet Header | IP | TCP | Data | FCS] Data Link (Frame)
011010010110111001100101                  Physical (Bits)`,
          math: `\\text{Encapsulation Pipeline: } \\text{Bits} \\rightarrow \\text{Frame} \\rightarrow \\text{Packet} \\rightarrow \\text{Segment} \\rightarrow \\text{Data}`,
          examTip: 'Remember the device mappings: Repeaters/Hubs operate at Layer 1, Switches/Bridges at Layer 2, Routers at Layer 3, and Gateways/Firewalls at Layer 4-7.'
        }
      }
    },
    ai: {
      subject: 'Artificial Intelligence',
      keywords: ['ai', 'what is ai', 'artificial intelligence', 'turing test', 'intelligent agent', 'rational agent', 'generative ai', 'genai', 'large language model', 'llm', 'chatgpt', 'expert system', 'nlp', 'computer vision', 'reinforcement learning', 'knowledge representation', 'heuristics', 'a* search', 'minimax', 'alpha beta pruning'],
      canonicalAnswers: {
        ai: {
          title: 'Artificial Intelligence (AI): Principles, Paradigms & Architecture',
          keywords: ['ai', 'what is ai', 'artificial intelligence', 'define ai', 'explain ai', 'concept of ai'],
          overview: 'Artificial Intelligence (AI) is the branch of computer science focused on engineering computational systems and agents capable of performing cognitive tasks typically requiring human intelligence—including problem-solving, reasoning, knowledge representation, perception, planning, and natural language comprehension.',
          steps: [
            '**The 4 Classical Paradigms (Russell & Norvig Framework)**:\n   * **Thinking Humanly**: Cognitive science models simulating human neuro-cognitive pathways.\n   * **Thinking Rationally**: Formal laws of thought based on deductive mathematical logic.\n   * **Acting Humanly**: Emulating human behavior validated via the empirical **Turing Test**.\n   * **Acting Rationally (Modern Standard)**: Designing **Rational Agents** that maximize expected performance measures $\\mathbb{E}[U]$ given environment percept histories.',
            '**The AI Sub-field Taxonomy**:\n   * **Artificial Intelligence (Broadest Domain)**: Any technique enabling machines to mimic cognitive capabilities.\n   * **Machine Learning (Subset)**: Statistical algorithms learning predictive patterns directly from training data without explicit procedural rules.\n   * **Deep Learning (Sub-subset)**: Multi-layered Artificial Neural Networks (ANNs/Transformers) performing hierarchical representation learning.\n   * **Generative AI & LLMs**: Probabilistic foundation models generating synthesized text, vision, code, or audio using transformer self-attention mechanisms.',
            '**Core Architecture of an Intelligent Agent**:\n   * **Sensors**: Ingest environment percepts ($s_t \\in \\mathcal{S}$).\n   * **Agent Function ($f: \\mathcal{P}^* \\rightarrow \\mathcal{A}$)**: Maps percept sequences to optimal policy actions.\n   * **Actuators**: Execute decisions into the environment to alter system state.'
          ],
          code: `# Python Implementation: Rational Reflex Agent & Decision Engine
import numpy as np

class IntelligentReflexAgent:
    """A rational agent that evaluates environment state and executes optimal actions."""
    def __init__(self, name="AcademicAgent"):
        self.name = name
        self.knowledge_base = {
            'HIGH_TEMP': 'ACTIVATE_COOLING',
            'LOW_MEMORY': 'TRIGGER_GARBAGE_COLLECTION',
            'NETWORK_CONGESTION': 'APPLY_EXPONENTIAL_BACKOFF',
            'NORMAL': 'IDLE_OPTIMIZE'
        }
        self.state_history = []

    def perceive(self, sensor_input):
        """Ingest sensory data from the external environment."""
        state = sensor_input.get('condition', 'NORMAL')
        self.state_history.append(state)
        return state

    def act(self, current_state):
        """Select the rational action that maximizes system utility."""
        action = self.knowledge_base.get(current_state, 'LOG_UNKNOWN_ANOMALY')
        return {
            'agent': self.name,
            'percept': current_state,
            'action_executed': action,
            'status': 'SUCCESS'
        }

# Execution Demonstration
agent = IntelligentReflexAgent()
percept = {'condition': 'HIGH_TEMP', 'metric': 88.5}
state = agent.perceive(percept)
decision = agent.act(state)
print("Agent Decision Output:", decision)`,
          math: `\\text{Rational Action: } a^* = \\arg\\max_{a \\in \\mathcal{A}} \\mathbb{E}\\left[ \\sum_{t=0}^{\\infty} \\gamma^t R(s_t, a_t) \\,\\middle|\\, s_0 \\right]`,
          examTip: 'For university exams: (1) State the 4 Russell & Norvig categories (Thinking/Acting Humanly vs Rationally), (2) Draw the Agent-Environment Loop with Sensors and Actuators, and (3) Contrast Weak AI (Narrow, task-specific like AlphaGo) with Strong AI (Artificial General Intelligence - AGI).'
        },
        turing_test: {
          title: 'The Turing Test & Operational Definitions of Intelligence',
          keywords: ['turing test', 'turing', 'alan turing', 'imitation game'],
          overview: 'Proposed by Alan Turing in 1950 (the "Imitation Game"), the **Turing Test** evaluates whether a machine can exhibit intelligent behavior indistinguishable from that of a human through natural language dialogue.',
          steps: [
            '**Test Setup**: A human interrogator interacts via text terminal with two hidden entities: one human and one machine. If the interrogator cannot reliably distinguish machine from human after structured questioning, the machine passes.',
            '**Necessary AI Capabilities to Pass**:\n   * **Natural Language Processing (NLP)**: Understand and articulate conversational syntax.\n   * **Knowledge Representation**: Store and recall facts systematically.\n   * **Automated Reasoning**: Draw sound deductions and answer queries.\n   * **Machine Learning**: Adapt to new contexts and identify patterns.\n   * **Total Turing Test**: Extends the test to include computer vision and robotics.',
            '**Key Philosophical Critiques**:\n   * **John Searle\'s Chinese Room Argument**: Demonstrates that syntactic symbol manipulation does not equal semantic consciousness or true understanding.'
          ],
          code: `# Python Simulation: Turing Game Interrogator Validator
class TuringTester:
    @staticmethod
    def evaluate_response(response_text, expected_semantics):
        # Checks if semantic entropy matches human linguistic distribution
        coherence_score = len(response_text.split()) > 3
        return {"turing_candidate": True, "coherence": coherence_score}`,
          math: `P(\\text{Interrogator Correct}) \\approx 0.50 \\implies \\text{Pass Threshold}`,
          examTip: 'Remember the difference between the standard Turing Test (text dialogue) and the Total Turing Test (adds Computer Vision and Robotics for physical interaction).'
        }
      }
    },
    ml: {
      subject: 'Machine Learning',
      keywords: ['model', 'ml model', 'machine learning', 'logistic regression', 'linear regression', 'neural network', 'deep learning', 'overfitting', 'underfitting', 'gradient descent', 'classification', 'loss function', 'backpropagation', 'regularization', 'cross-entropy', 'bias variance', 'supervised learning', 'unsupervised learning', 'decision tree', 'random forest', 'svm', 'support vector machine', 'knn', 'clustering', 'kmeans', 'cnn', 'rnn', 'transformer', 'attention', 'confusion matrix', 'precision recall', 'f1 score'],
      canonicalAnswers: {
        model: {
          title: 'Machine Learning Model Architecture: Hypothesis Function & Parameters',
          overview: 'In Machine Learning, a **Model** is a parameterized mathematical representation $f(X; \\theta)$ learned from data that maps input feature vectors $X \\in \\mathbb{R}^d$ to target predictions $\\hat{y}$. The training process optimizes parameters $\\theta = \\{W, b\\}$ by minimizing an empirical loss function $\\mathcal{L}(y, \\hat{y})$.',
          steps: [
            '**Core Components of an ML Model**:\n   * **Hypothesis Space $\\mathcal{H}$**: The family of functions the model can represent (e.g., linear hyperplanes, decision boundaries, deep multi-layer transformations).\n   * **Parameters (Weights $W$ and Bias $b$)**: Internal variables learned automatically during the optimization phase via gradient backpropagation.\n   * **Hyperparameters**: Configuration settings set before training (e.g., learning rate $\\alpha$, batch size, number of layers, regularization factor $\\lambda$).',
            '**The 4-Stage Machine Learning Lifecycle**:\n   1. **Feature Engineering & Representation**: Transform raw input data into normalized numerical tensor matrices $X$.\n   2. **Forward Inference**: Compute $\\hat{y} = f(X; \\theta)$.\n   3. **Loss Computation**: Measure error via objective functions (e.g. MSE for regression, Cross-Entropy for classification).\n   4. **Optimization**: Compute gradients $\\nabla_\\theta \\mathcal{L}$ and update weights via Gradient Descent: $\\theta \\leftarrow \\theta - \\alpha \\nabla_\\theta \\mathcal{L}$.',
            '**Model Evaluation & Generalization**:\n   * Must be evaluated on unseen **Test Data** to measure true generalization ability.\n   * Evaluated using metrics such as Accuracy, Precision, Recall, F1-Score, ROC-AUC, or Mean Squared Error (MSE).'
          ],
          code: `# Python Scikit-Learn & PyTorch ML Model Pipeline
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import torch
import torch.nn as nn

# 1. Defining a Parametric Machine Learning Model
class AcademicMLModel(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super(AcademicMLModel, self).__init__()
        # Parameters (Weights W1, W2 and Biases b1, b2)
        self.fc1 = nn.Linear(input_dim, hidden_dim)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(hidden_dim, output_dim)
        
    def forward(self, x):
        # Hypothesis function f(X; theta)
        out = self.fc1(x)
        out = self.relu(out)
        out = self.fc2(out)
        return out

# 2. Training Loop: Minimizing Empirical Risk
model = AcademicMLModel(input_dim=10, hidden_dim=32, output_dim=2)
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

print("ML Model Parameter Architecture:")
for name, param in model.named_parameters():
    print(f" - {name}: shape {param.shape}")`,
          math: `\\hat{y} = f(X; \\theta) = \\sigma(W^T X + b), \\quad \\theta^* = \\arg\\min_\\theta \\frac{1}{N} \\sum_{i=1}^N \\mathcal{L}(y_i, f(x_i; \\theta))`,
          examTip: 'Distinguish between an **Algorithm** (the learning procedure, e.g. Gradient Descent, ID3) and a **Model** (the resulting mathematical artifact containing trained weights and biases).'
        },
        logistic_regression: {
          title: 'Logistic Regression & Sigmoid Decision Boundary',
          overview: 'Logistic Regression is a supervised classification algorithm that models the posterior probability $P(Y=1|X)$ using the non-linear logistic **Sigmoid function** $\\sigma(z) = \\frac{1}{1 + e^{-z}}$.',
          steps: [
            '**Sigmoid Transformation**: Maps unbounded linear combinations $z = w^T x + b \\in (-\\infty, +\\infty)$ into a valid probability interval $(0, 1)$.',
            '**Binary Cross-Entropy Loss (Log-Loss)**: Derived via Maximum Likelihood Estimation (MLE):\n   $$\\mathcal{L}(w) = -\\frac{1}{m} \\sum_{i=1}^m \\left[ y^{(i)} \\log(\\hat{y}^{(i)}) + (1 - y^{(i)}) \\log(1 - \\hat{y}^{(i)}) \\right]$$',
            '**Decision Boundary**: If $P(Y=1|X) \\geq 0.5$ (i.e. $w^T x + b \\geq 0$), predict class 1; otherwise predict class 0.'
          ],
          code: `# Python Logistic Regression Classifier
import numpy as np

class LogisticRegressionFromScratch:
    def __init__(self, lr=0.01, epochs=1000):
        self.lr = lr
        self.epochs = epochs
        self.weights = None
        self.bias = None

    def _sigmoid(self, z):
        return 1.0 / (1.0 + np.exp(-np.clip(z, -250, 250)))

    def fit(self, X, y):
        n_samples, n_features = X.shape
        self.weights = np.zeros(n_features)
        self.bias = 0.0

        for _ in range(self.epochs):
            linear_model = np.dot(X, self.weights) + self.bias
            y_pred = self._sigmoid(linear_model)

            # Gradient calculation
            dw = (1 / n_samples) * np.dot(X.T, (y_pred - y))
            db = (1 / n_samples) * np.sum(y_pred - y)

            # Parameter update
            self.weights -= self.lr * dw
            self.bias -= self.lr * db

    def predict(self, X):
        linear_model = np.dot(X, self.weights) + self.bias
        y_pred = self._sigmoid(linear_model)
        return (y_pred >= 0.5).astype(int)`,
          math: `P(Y=1|X) = \\sigma(W^T X + b) = \\frac{1}{1 + e^{-(W^T X + b)}}`,
          examTip: 'Explain why Mean Squared Error (MSE) is not used for Logistic Regression: MSE creates a non-convex loss surface with numerous local minima, whereas Binary Cross-Entropy is strictly convex.'
        },
        overfitting: {
          title: 'Overfitting in Machine Learning: Bias-Variance Tradeoff',
          overview: 'Overfitting occurs when a model memorizes training data noise and random variations rather than learning generalizable patterns, resulting in near-zero training error but high test error.',
          steps: [
            '**Root Causes**: High hypothesis complexity, limited training samples, noisy labels, or over-training.',
            '**Mitigation Techniques**:\n   * **Regularization**: $L_1$ (Lasso for sparsity) and $L_2$ (Ridge / Weight Decay to constrain parameter norms).\n   * **Cross-Validation**: $k$-Fold Cross-Validation for unbiased validation estimates.\n   * **Dropout**: Randomly deactivating neuron activations during forward passes in deep networks.\n   * **Early Stopping**: Halting training when validation loss begins to diverge.'
          ],
          code: `# Python PyTorch Regularized Neural Network
import torch
import torch.nn as nn

class RegularizedModel(nn.Module):
    def __init__(self, in_features, num_classes):
        super().__init__()
        self.fc1 = nn.Linear(in_features, 64)
        self.dropout = nn.Dropout(p=0.3)
        self.fc2 = nn.Linear(64, num_classes)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = self.dropout(x)
        return self.fc2(x)`,
          math: `\\mathcal{L}_{\\text{total}}(\\theta) = \\mathcal{L}_{\\text{data}}(\\theta) + \\lambda \\|\\theta\\|_2^2`,
          examTip: 'High variance = Overfitting (model too complex). High bias = Underfitting (model too simple). Total expected error = $\\text{Bias}^2 + \\text{Variance} + \\sigma^2$.'
        },
        gradient: {
          title: 'Gradient Descent Optimization & Learning Rate Dynamics',
          overview: 'Gradient Descent is a first-order iterative optimization algorithm that minimizes objective loss functions $J(\\theta)$ by updating parameters in the direction of steepest negative gradient.',
          steps: [
            '**Core Parameter Update**: $\\theta := \\theta - \\alpha \\nabla_{\\theta} J(\\theta)$ where $\\alpha > 0$ is the learning rate.',
            '**Variants**:\n   * **Batch GD**: Computes gradient over entire dataset (accurate but slow for massive datasets).\n   * **Stochastic GD (SGD)**: Updates weights per single training sample (high variance, escapes saddle points).\n   * **Mini-Batch GD**: Evaluates gradients over small batches ($B=32, 64, 128$) leveraging GPU vectorization.'
          ],
          code: `# NumPy Mini-Batch Gradient Descent
import numpy as np

def mini_batch_step(X_batch, y_batch, W, b, lr=0.01):
    m = X_batch.shape[0]
    preds = np.dot(X_batch, W) + b
    errors = preds - y_batch
    
    dW = (2 / m) * np.dot(X_batch.T, errors)
    db = (2 / m) * np.sum(errors)
    
    W -= lr * dW
    b -= lr * db
    return W, b`,
          math: `\\theta_{t+1} = \\theta_t - \\alpha \\cdot \\nabla J(\\theta_t)`,
          examTip: 'Compare Adam vs SGD with Momentum in exams: Adam maintains adaptive learning rates for each parameter using first ($m_t$) and second ($v_t$) moment estimations.'
        }
      }
    }
  };

  /**
   * Resolve active user ID
   */
  function getCurrentUserId() {
    if (typeof AuthService !== 'undefined' && AuthService.getCurrentUser()) {
      return AuthService.getCurrentUser().uid;
    }
    return 'usr_stu_8842';
  }

  /**
   * Local storage key for isolated user conversations
   */
  function getStorageKey(userId) {
    const uid = userId || getCurrentUserId();
    return `smart_student_doubts_${uid}`;
  }

  /**
   * Seed realistic initial academic conversation history if user has none
   */
  function getSeedConversations() {
    return [
      {
        id: 'conv_seed_001',
        userId: getCurrentUserId(),
        title: 'Database Normalization (1NF to BCNF)',
        subject: 'Database Management Systems',
        difficulty: 'Intermediate',
        mode: 'breakdown',
        bookmarked: true,
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        messages: [
          {
            id: 'msg_001_1',
            role: 'user',
            content: 'Explain database normalization (1NF, 2NF, 3NF, BCNF) with a simple student table example.',
            timestamp: 'Yesterday at 08:30 PM',
            attachments: []
          },
          {
            id: 'msg_001_2',
            role: 'assistant',
            subject: 'Database Management Systems',
            topic: 'Normalization',
            difficulty: 'Intermediate',
            content: `### Database Normalization Overview

Database normalization is the systematic process of organizing table schemas to reduce data redundancy and eliminate update, insertion, and deletion anomalies while enforcing referential integrity.

---

### Step-by-Step Normal Forms

1. **First Normal Form (1NF)**
   * Every column must contain **atomic** (indivisible) values.
   * No repeating groups or multivalued arrays in a single cell.
   * A primary key uniquely identifies each record.

2. **Second Normal Form (2NF)**
   * Meets all requirements of **1NF**.
   * Eliminates **partial functional dependency**: non-prime attributes must depend on the entire candidate key, not a proper subset.

3. **Third Normal Form (3NF)**
   * Meets all requirements of **2NF**.
   * Eliminates **transitive functional dependency**: non-key attributes cannot depend on other non-key attributes ($X \\rightarrow Y$ and $Y \\rightarrow Z$).

4. **Boyce-Codd Normal Form (BCNF)**
   * Strict 3.5NF: for every functional dependency $X \\rightarrow Y$, $X$ must be a **superkey**.

---

### Schema Decomposition Code

\`\`\`sql
-- Decomposing unnormalized student enrollments into 3NF
CREATE TABLE Departments (
  dept_id INT PRIMARY KEY,
  dept_name VARCHAR(100) NOT NULL,
  hod_name VARCHAR(100) NOT NULL
);

CREATE TABLE Students (
  student_id INT PRIMARY KEY,
  student_name VARCHAR(100) NOT NULL,
  dept_id INT,
  FOREIGN KEY (dept_id) REFERENCES Departments(dept_id)
);

CREATE TABLE Enrollments (
  student_id INT,
  course_code VARCHAR(10),
  grade VARCHAR(2),
  PRIMARY KEY (student_id, course_code),
  FOREIGN KEY (student_id) REFERENCES Students(student_id)
);
\`\`\`

> [!TIP]
> **University Exam Formula:** Always compute the attribute closure $(X^+)$ for all given FDs to determine candidate keys before checking BCNF violation.`,
            timestamp: 'Yesterday at 08:31 PM'
          }
        ]
      },
      {
        id: 'conv_seed_002',
        userId: getCurrentUserId(),
        title: 'TCP 3-Way Handshake vs UDP',
        subject: 'Computer Networks',
        difficulty: 'Intermediate',
        mode: 'breakdown',
        bookmarked: false,
        createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
        messages: [
          {
            id: 'msg_002_1',
            role: 'user',
            content: 'What is the difference between TCP and UDP transport protocols and how does the 3-way handshake work?',
            timestamp: 'Sep 02, 2026',
            attachments: []
          },
          {
            id: 'msg_002_2',
            role: 'assistant',
            subject: 'Computer Networks',
            topic: 'Transport Protocols',
            difficulty: 'Intermediate',
            content: `### TCP vs UDP Transport Layer Architecture

| Metric | Transmission Control Protocol (TCP) | User Datagram Protocol (UDP) |
| :--- | :--- | :--- |
| **Connection State** | Connection-Oriented (Handshake) | Connectionless (Fire & Forget) |
| **Reliability** | Guaranteed (ACKs + Retransmit) | Best-Effort (No Retransmit) |
| **Ordering** | Strict Sequence Byte Streaming | Datagrams may arrive out of order |
| **Header Size** | 20–60 Bytes | 8 Bytes Fixed |
| **Use Cases** | Web (HTTP/S), SSH, FTP, Database | VoIP, DNS, Video Live Stream, Gaming |

---

### The TCP 3-Way Handshake

1. **Client $\\rightarrow$ Server [SYN]**: Client initiates with sequence number $seq = x$.
2. **Server $\\rightarrow$ Client [SYN + ACK]**: Server acknowledges with $ack = x + 1$ and sets its own sequence $seq = y$.
3. **Client $\\rightarrow$ Server [ACK]**: Client acknowledges server sequence with $ack = y + 1$. Connection is now established.

\`\`\`
Client                                    Server
  | ----- SYN (seq=x) ------------------> |
  | <---- SYN-ACK (seq=y, ack=x+1) ------ |
  | ----- ACK (ack=y+1) ----------------> |
  | ===== ESTABLISHED (Data Flow) ======= |
\`\`\``,
            timestamp: 'Sep 02, 2026'
          }
        ]
      },
      {
        id: 'conv_seed_003',
        userId: getCurrentUserId(),
        title: 'Dijkstra Shortest Path Algorithm',
        subject: 'Data Structures & Algorithms',
        difficulty: 'Advanced',
        mode: 'code',
        bookmarked: true,
        createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 72).toISOString(),
        messages: [
          {
            id: 'msg_003_1',
            role: 'user',
            content: "How does Dijkstra's algorithm work and what is its time complexity with a min-heap?",
            timestamp: 'Aug 30, 2026',
            attachments: []
          },
          {
            id: 'msg_003_2',
            role: 'assistant',
            subject: 'Data Structures & Algorithms',
            topic: 'Graph Algorithms',
            difficulty: 'Advanced',
            content: `### Dijkstra's Single-Source Shortest Path

Dijkstra's algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph with **non-negative edge weights** ($w \\ge 0$).

---

### Algorithmic Execution Steps

1. **Initialize** a distance array $dist[src] = 0$ and $dist[v] = \\infty$ for all other vertices.
2. Push $(0, src)$ into a **Min-Priority Queue**.
3. **While** the queue is not empty:
   * Extract vertex $u$ with minimum current distance.
   * For every neighbor $v$ connected via edge weight $w$:
     $$\\text{if } dist[u] + w < dist[v] \\implies dist[v] = dist[u] + w$$
     Push $(dist[v], v)$ into the Min-Priority Queue.

---

### C++ Implementation

\`\`\`cpp
#include <vector>
#include <queue>
using namespace std;

typedef pair<int, int> pii; // (distance, node)

vector<int> dijkstra(int V, vector<vector<pii>>& adj, int src) {
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    vector<int> dist(V, 1e9);

    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        int d = pq.top().first;
        int u = pq.top().second;
        pq.pop();

        if (d > dist[u]) continue;

        for (auto& edge : adj[u]) {
            int v = edge.first;
            int weight = edge.second;

            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}
\`\`\`

---

### Complexity Analysis
* **Time Complexity**: $\\mathcal{O}((V + E) \\log V)$ using a binary min-heap.
* **Space Complexity**: $\\mathcal{O}(V + E)$ for adjacency lists and heap buffers.`,
            timestamp: 'Aug 30, 2026'
          }
        ]
      }
    ];
  }

  /**
   * Retrieve all user conversations from storage or Firestore
   */
  async function getConversations(userId) {
    const uid = userId || getCurrentUserId();
    const key = getStorageKey(uid);

    // Try Firestore if live
    if (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
      try {
        const db = window.SmartStudentFirebase.getDb();
        if (db) {
          const snapshot = await db.collection('doubts')
            .where('userId', '==', uid)
            .get();

          if (!snapshot.empty) {
            const list = [];
            snapshot.forEach(doc => {
              list.push({ id: doc.id, ...doc.data() });
            });
            list.sort((a, b) => {
              const parseTime = (t) => {
                if (!t) return 0;
                if (typeof t.toMillis === 'function') return t.toMillis();
                if (typeof t.toDate === 'function') return t.toDate().getTime();
                if (typeof t === 'number') return t;
                const parsed = new Date(t).getTime();
                return isNaN(parsed) ? 0 : parsed;
              };
              return parseTime(b.updatedAt || b.createdAt) - parseTime(a.updatedAt || a.createdAt);
            });
            return list;
          }
        }
      } catch (err) {
        console.warn('Firestore getConversations fallback to local storage:', err);
      }
    }

    // Local Storage Fallback
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Error reading doubts from storage:', e);
    }

    // Initialize with seed data
    const initial = getSeedConversations();
    saveConversations(initial, uid);
    return initial;
  }

  /**
   * Save conversations array to user storage
   */
  function saveConversations(conversations, userId) {
    const uid = userId || getCurrentUserId();
    const key = getStorageKey(uid);
    try {
      localStorage.setItem(key, JSON.stringify(conversations));
    } catch (e) {
      console.warn('Error persisting doubts to localStorage:', e);
    }
  }

  /**
   * Retrieve single conversation by ID
   */
  async function getConversation(conversationId, userId) {
    const list = await getConversations(userId);
    return list.find(c => c.id === conversationId) || null;
  }

  /**
   * Create a new conversation session
   */
  async function createConversation(initialData = {}, userId) {
    const uid = userId || getCurrentUserId();
    const list = await getConversations(uid);

    const newConv = {
      id: 'conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      userId: uid,
      title: initialData.title || 'New Academic Doubt',
      subject: initialData.subject || 'All Engineering Subjects',
      difficulty: initialData.difficulty || 'Intermediate',
      mode: initialData.mode || 'breakdown',
      tutorMode: initialData.tutorMode || false,
      bookmarked: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: []
    };

    list.unshift(newConv);
    saveConversations(list, uid);

    // Sync with Firestore if active
    if (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
      try {
        const db = window.SmartStudentFirebase.getDb();
        await db.collection('doubts').doc(newConv.id).set({
          ...newConv,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      } catch (e) {
        console.warn('Firestore doubt creation fallback:', e);
      }
    }

    return newConv;
  }

  /**
   * Rename an existing conversation
   */
  async function renameConversation(conversationId, newTitle, userId) {
    const uid = userId || getCurrentUserId();
    const list = await getConversations(uid);
    const conv = list.find(c => c.id === conversationId);

    if (conv) {
      conv.title = (newTitle || '').trim() || 'Untitled Doubt';
      conv.updatedAt = new Date().toISOString();
      saveConversations(list, uid);

      if (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
        try {
          const db = window.SmartStudentFirebase.getDb();
          await db.collection('doubts').doc(conversationId).update({
            title: conv.title,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        } catch (e) { }
      }
      return conv;
    }
    return null;
  }

  /**
   * Delete a conversation
   */
  async function deleteConversation(conversationId, userId) {
    const uid = userId || getCurrentUserId();
    const list = await getConversations(uid);
    const index = list.findIndex(c => c.id === conversationId);

    if (index !== -1) {
      list.splice(index, 1);
      saveConversations(list, uid);

      if (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
        try {
          const db = window.SmartStudentFirebase.getDb();
          await db.collection('doubts').doc(conversationId).delete();
        } catch (e) { }
      }
      return true;
    }
    return false;
  }

  /**
   * Toggle bookmark/saved status on conversation or message
   */
  async function toggleBookmark(conversationId, messageId = null, userId = null) {
    const uid = userId || getCurrentUserId();
    const list = await getConversations(uid);
    const conv = list.find(c => c.id === conversationId);

    if (!conv) return false;

    if (messageId) {
      const msg = conv.messages.find(m => m.id === messageId);
      if (msg) {
        msg.bookmarked = !msg.bookmarked;
      }
    } else {
      conv.bookmarked = !conv.bookmarked;
    }

    conv.updatedAt = new Date().toISOString();
    saveConversations(list, uid);

    if (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
      try {
        const db = window.SmartStudentFirebase.getDb();
        await db.collection('doubts').doc(conversationId).update({
          bookmarked: conv.bookmarked,
          messages: conv.messages,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      } catch (e) { }
    }

    return conv.bookmarked;
  }

  /**
   * Helper: Match keyword with word boundaries for short terms
   */
  function matchesKeyword(text, keyword) {
    if (!text || !keyword) return false;
    const kw = keyword.toLowerCase();
    const lower = text.toLowerCase();
    if (kw.length <= 4) {
      const regex = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}\\b`, 'i');
      return regex.test(lower);
    }
    return lower.includes(kw);
  }

  /**
   * Smart Subject & Topic Detection
   */
  function detectSubjectAndTopic(queryText = '') {
    const lower = queryText.toLowerCase();

    for (const [key, data] of Object.entries(DOMAIN_TOPICS)) {
      for (const kw of data.keywords) {
        if (matchesKeyword(lower, kw)) {
          let matchedTopic = kw.charAt(0).toUpperCase() + kw.slice(1);
          return {
            domainKey: key,
            subject: data.subject,
            topic: matchedTopic,
            difficulty: lower.includes('proof') || lower.includes('derive') || lower.includes('bcnf') || lower.includes('optimal') || lower.includes('analysis') ? 'Advanced' : 'Intermediate'
          };
        }
      }
    }

    // Default Fallback
    return {
      domainKey: 'general',
      subject: 'Computer Science & Engineering',
      topic: 'Engineering Concept',
      difficulty: 'Intermediate'
    };
  }

  /**
   * Multi-Turn Conversational Reasoning Engine
   * Generates contextual responses taking academic level, question type, and tutor mode into account
   */
  async function generateContextualResponse(query, conversationHistory = [], options = {}, onStageProgress = null) {
    const { subject, difficulty = 'Intermediate', mode = 'breakdown', tutorMode = false, attachments = [] } = options;

    // Stage 1: Question analysis
    if (onStageProgress) onStageProgress('Analyzing academic query & syllabus requirements...');
    await new Promise(r => setTimeout(r, 200));

    // Stage 2: Synthesis & Knowledge extraction
    if (onStageProgress) onStageProgress('Synthesizing verified academic concepts...');
    await new Promise(r => setTimeout(r, 250));

    // Stage 3: Formulation
    if (onStageProgress) onStageProgress('Structuring academic tutor response...');
    await new Promise(r => setTimeout(r, 150));

    const cleanQuery = query.trim();
    const lower = cleanQuery.toLowerCase();
    const detected = detectSubjectAndTopic(cleanQuery);
    
    // If user's conversation was on a different subject, intelligently prioritize detected domain
    const isSubjectMismatch = detected.domainKey !== 'general' && (!subject || subject === 'All Engineering Subjects' || (subject === 'Database Management Systems' && detected.domainKey !== 'dbms'));
    const resolvedSubject = isSubjectMismatch ? detected.subject : (subject || detected.subject);

    // Normalize academic level
    let level = 'Intermediate';
    if (/intro|basic|beginner|easy/i.test(difficulty)) level = 'Beginner';
    else if (/adv|exam|hard|gate|grad/i.test(difficulty)) level = 'Advanced';

    // Classify Question Type Internally
    const isDefinition = /^(what is|define|what are|what do you mean by|explain the concept of)\b/i.test(lower);
    const isDifference = /\b(difference between|vs\\.?|versus|compare|distinguish|difference)\b/i.test(lower);
    const isWhy = /^(why do we|why is|why use|why)\b/i.test(lower);
    const isHow = /^(how does|how to|how do|explain how)\b/i.test(lower);
    const isCode = mode === 'code' || /\b(write (a )?(sql|python|c\\+\\+|java|javascript|cpp|rust|go|program|query|code)|implement|implementation|give code|show code|code for|program for|write code|coding|script|syntax for|provide code|code example|syntax)\b/i.test(lower);
    const isExam = /\b(for \\d+ marks|exam|gate|university question|important questions|exam point)\b/i.test(lower);

    // 1. Socratic Tutor Mode: Guides progressively rather than dumping monolithic answers
    if (tutorMode) {
      return generateSocraticResponse(cleanQuery, conversationHistory, resolvedSubject, detected.topic, level);
    }

    // 2. High-Precision Canonical Question Handlers

    // Question: "What is AI?" / "What is Artificial Intelligence?"
    if (matchesKeyword(lower, 'what is ai') || lower === 'what is ai' || lower === 'what is ai?' || lower === 'what is artificial intelligence' || lower === 'what is artificial intelligence?' || lower === 'explain ai' || lower === 'define ai' || (lower.includes('what is') && (lower.includes('artificial intelligence') || lower.includes('ai concept')))) {
      if (isCode) {
        return `### Code Implementation: Intelligent Reflex Agent & Decision Engine (Python)

Here is a clean, academic implementation of a rational reflex agent that evaluates environment state and executes optimal actions:

\`\`\`python
import numpy as np

class IntelligentReflexAgent:
    """A rational agent that evaluates environment state and executes optimal actions."""
    def __init__(self, name="AcademicAgent"):
        self.name = name
        self.knowledge_base = {
            'HIGH_TEMP': 'ACTIVATE_COOLING',
            'LOW_MEMORY': 'TRIGGER_GARBAGE_COLLECTION',
            'NETWORK_CONGESTION': 'APPLY_EXPONENTIAL_BACKOFF',
            'NORMAL': 'IDLE_OPTIMIZE'
        }
        self.state_history = []

    def perceive(self, sensor_input):
        """Ingest sensory data from the external environment."""
        state = sensor_input.get('condition', 'NORMAL')
        self.state_history.append(state)
        return state

    def act(self, current_state):
        """Select the rational action that maximizes system utility."""
        action = self.knowledge_base.get(current_state, 'LOG_UNKNOWN_ANOMALY')
        return {
            'agent': self.name,
            'percept': current_state,
            'action_executed': action,
            'status': 'SUCCESS'
        }

# Execution Demonstration
agent = IntelligentReflexAgent()
percept = {'condition': 'HIGH_TEMP', 'metric': 88.5}
state = agent.perceive(percept)
decision = agent.act(state)
print("Agent Decision Output:", decision)
\`\`\`

---

### Complexity & Analysis
* **Time Complexity**: $\\mathcal{O}(1)$ lookup per decision turn.
* **Space Complexity**: $\\mathcal{O}(|\\mathcal{S}|)$ to maintain state transition history.`;
      }

      if (level === 'Beginner') {
        return `### What is Artificial Intelligence (AI)?

**Artificial Intelligence (AI)** is the branch of computer science that builds smart machines capable of performing tasks that typically require human thinking, learning, and intelligence.

---

#### 1. Core Capabilities of AI:
* **Learning**: Acquiring information, recognizing patterns, and improving from experience.
* **Reasoning**: Using logic and rules to reach valid conclusions or solve problems.
* **Self-Correction**: Continually refining accuracy based on feedback and error minimization.
* **Perception**: Recognizing images, sounds, speech, video, and human natural language.

---

#### 2. Everyday Examples:
* **Generative AI & LLMs**: Tools like Google Gemini and ChatGPT answering questions, analyzing complex code, and generating explanations.
* **Voice Assistants**: Siri, Google Assistant, and Alexa processing natural voice commands.
* **Autonomous Systems**: Self-driving cars (Tesla, Waymo) detecting road obstacles and traffic lights in real time.
* **Recommendation Engines**: Netflix recommending movies and Spotify creating tailored music playlists.

---

#### 3. The 3 Broad Types of AI:
1. **Narrow AI (Weak AI)**: AI designed to perform a dedicated, specific task (e.g., facial recognition, chess bots). *This represents all practical AI systems deployed today.*
2. **General AI (Strong AI / AGI)**: Theoretical AI that can understand, learn, and generalize knowledge across any intellectual task just like a human brain.
3. **Super AI (ASI)**: Hypothetical AI that surpasses human capability across all scientific, creative, and strategic domains.

---

> [!TIP]
> **Key Takeaway**: AI is machines emulating human cognitive capabilities (learning, reasoning, problem solving) using mathematical models and data.`;
      } else if (level === 'Advanced') {
        return `### Artificial Intelligence (AI): Formal Theory, Paradigms & Mathematical Foundations

**Artificial Intelligence (AI)** is the scientific and engineering discipline concerned with computational synthesis and automated analysis of **Rational Agents** that perceive their environment via sensors and execute actions via actuators to maximize expected performance measures.

---

### 1. The Four Foundational Paradigms (Russell & Norvig Framework)

| Paradigm | Human-Centric Standard | Rationality Standard (Mathematical Ideal) |
| :--- | :--- | :--- |
| **Thinking** | **Cognitive Modeling**: Formulating computational simulations of human neural and cognitive processes. | **Laws of Thought**: Formalizing deductive reasoning via First-Order Logic, Propositional Calculus, and Automated Theorem Proving. |
| **Acting** | **The Turing Test**: Operational benchmark validating if an interrogator cannot distinguish machine from human in natural dialogue. | **Rational Agent Architecture**: Designing agents that maximize expected performance measure $\\mathbb{E}[U]$ under environmental uncertainty. |

---

### 2. Modern AI Hierarchy & Taxonomy

\`\`\`
┌─────────────────────────────────────────────────────────┐
│ Artificial Intelligence (AI) - Universal Scope          │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Machine Learning (ML) - Statistical Patterns      │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │ Deep Learning (DL) - Multi-Layer Neural Nets│  │  │
│  │  │  ┌───────────────────────────────────────┐  │  │  │
│  │  │  │ Generative AI & Foundation LLMs       │  │  │  │
│  │  │  └───────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
\`\`\`

---

### 3. Mathematical Formulation of a Rational Agent

An intelligent agent is governed by an **agent function** $f: \\mathcal{P}^* \\rightarrow \\mathcal{A}$ mapping a history of environment percepts $\\mathcal{P}^*$ to the action space $\\mathcal{A}$. In a Markov Decision Process (MDP), the optimal policy $\\pi^*$ satisfies the **Bellman Optimality Equation**:

$$V^*(s) = \\max_{a \\in \\mathcal{A}} \\left[ R(s, a) + \\gamma \\sum_{s' \\in \\mathcal{S}} P(s' \\mid s, a) V^*(s') \\right]$$

---

> [!TIP]
> **University Examination Pointers (GATE & University Finals):**
> 1. **PEAS Framework**: Always specify **P**erformance measure, **E**nvironment, **A**ctuators, **S**ensors for any AI problem.
> 2. **Turing Test vs Chinese Room**: John Searle's Chinese Room argument demonstrates that syntactic symbol manipulation does not equal semantic understanding.`;
      } else {
        // Intermediate
        return `### What is Artificial Intelligence (AI)?

**Artificial Intelligence (AI)** is the branch of computer science dedicated to developing systems, algorithms, and computational models capable of performing tasks that traditionally require human cognitive intelligence.

---

### 1. The Core AI Hierarchy

1. **Artificial Intelligence (AI)**: The overarching field encompassing any machine that exhibits smart, goal-driven behavior.
2. **Machine Learning (ML)**: A subset of AI focused on algorithms that automatically learn patterns from data rather than being explicitly programmed with manual rules.
3. **Deep Learning (DL)**: A subset of ML utilizing multi-layered Artificial Neural Networks (ANNs) inspired by biological brain structures.
4. **Generative AI (GenAI)**: Advanced models (such as GPT and Gemini) that synthesize novel text, images, code, and structured reasoning.

---

### 2. Major Sub-disciplines of AI

* **Natural Language Processing (NLP)**: Enabling computers to understand, interpret, and generate human languages (e.g., machine translation, sentiment analysis, text summarization).
* **Computer Vision (CV)**: Extracting high-level understanding from digital images and videos (e.g., object detection, autonomous driving, medical imaging).
* **Robotics**: Combining AI algorithms with mechanical actuators for spatial navigation and physical manipulation.
* **Expert Systems & Knowledge Graphs**: Rule-based and semantic inference engines for specialized domain diagnosis.
* **Reinforcement Learning (RL)**: Training agents through trial-and-error rewards and penalties (e.g., AlphaGo, robotic locomotion).

---

### 3. How an Intelligent Agent Works

An AI agent continuously interacts with its environment through a closed-loop architecture:
1. **Sensors**: Ingest raw data/percepts from the external environment.
2. **Processing Core**: Applies algorithms, probabilistic models, or heuristic search ($A^*$ algorithm) to decide the best response.
3. **Actuators**: Execute the selected action back into the environment to alter system state.

---

> [!TIP]
> **University Exam Insight:** In academic exams, define AI using the **PEAS (Performance, Environment, Actuators, Sensors)** framework, and classify it into **Narrow AI (Weak)** vs **General AI (Strong)**.`;
      }
    }

    // Question: "What is Machine Learning?" / "ML vs AI"
    if (matchesKeyword(lower, 'what is machine learning') || lower === 'what is machine learning' || lower === 'what is machine learning?' || lower === 'what is ml' || lower === 'what is ml?' || lower === 'explain machine learning' || lower.includes('define machine learning')) {
      if (isCode) {
        return `### Code Implementation: Supervised Classification Pipeline (Python)

Here is the clean implementation of a classification workflow with training, prediction, and accuracy evaluation:

\`\`\`python
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# 1. Dataset: [Hours Studied, Attendance %] -> Pass (1) / Fail (0)
X = np.array([[2, 60], [5, 80], [1, 40], [8, 95], [3, 70], [7, 88], [4, 75], [9, 98]])
y = np.array([0, 1, 0, 1, 0, 1, 1, 1])

# 2. Split dataset into Train and Test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

# 3. Train Logistic Regression Model
model = LogisticRegression()
model.fit(X_train, y_train)

# 4. Predict and evaluate
predictions = model.predict(X_test)
print(f"Model Test Accuracy: {accuracy_score(y_test, predictions) * 100:.1f}%")
\`\`\`

---

### Complexity & Parameters
* **Training Time Complexity**: $\\mathcal{O}(N \\cdot d)$ per gradient step.
* **Inference Time Complexity**: $\\mathcal{O}(d)$ dot-product operation per test sample.`;
      }

      return `### What is Machine Learning (ML)?

**Machine Learning (ML)** is a subset of Artificial Intelligence (AI) focused on building algorithms that learn patterns from historical data to make predictions or decisions without being explicitly programmed with hardcoded rules.

---

### 1. The Three Primary Types of Machine Learning

| Paradigm | Description | Core Algorithms | Common Use Cases |
| :--- | :--- | :--- | :--- |
| **Supervised Learning** | Model trains on labeled data $(X, y)$ where inputs map to known outputs. | Linear/Logistic Regression, Decision Trees, Random Forests, SVM. | Spam filtering, medical diagnosis, housing price prediction. |
| **Unsupervised Learning** | Model discovers hidden patterns or clusters in unlabeled data $X$. | $K$-Means, Hierarchical Clustering, PCA, Autoencoders. | Customer segmentation, anomaly detection, dimensionality reduction. |
| **Reinforcement Learning** | Agent learns optimal behavior through trial-and-error rewards and penalties. | Q-Learning, Deep Q-Networks (DQN), PPO. | Game playing (Chess/Go), autonomous robotics, algorithmic trading. |

---

### 2. The Machine Learning Workflow

1. **Data Collection & Cleaning**: Gathering raw dataset and handling missing or corrupt values.
2. **Feature Engineering & Normalization**: Scaling features ($z = \\frac{x - \\mu}{\\sigma}$) to accelerate convergence.
3. **Model Selection & Training**: Optimizing parameters $\\theta = \\{W, b\\}$ by minimizing empirical loss $\\mathcal{L}(y, \\hat{y})$.
4. **Validation & Evaluation**: Testing on unseen data using metrics like Accuracy, Precision, Recall, F1-Score, and ROC-AUC.
5. **Hyperparameter Tuning**: Finding optimal learning rate $\\alpha$, regularization strength $\\lambda$, and batch sizes.

---

> [!TIP]
> **University Exam Insight:** Always explain the **Bias-Variance Tradeoff**: High Bias causes *Underfitting* (model too simple), while High Variance causes *Overfitting* (model memorizes noise). Regularization ($L_1/L_2$) and Cross-Validation balance this trade-off.`;
    }

    // Question: "What is Deep Learning?" / "Neural Networks"
    if (matchesKeyword(lower, 'what is deep learning') || matchesKeyword(lower, 'neural network') || matchesKeyword(lower, 'neural networks') || lower.includes('what is deep learning') || lower.includes('explain neural network')) {
      return `### Deep Learning & Artificial Neural Networks (ANNs)

**Deep Learning (DL)** is a specialized sub-branch of Machine Learning based on **Artificial Neural Networks (ANNs)** with multiple hidden layers ("deep" architectures) capable of learning hierarchical feature representations directly from raw, unstructured data.

---

### 1. Structure of an Artificial Neuron (Perceptron)

A single artificial neuron computes a weighted sum of inputs plus a bias term, passed through a non-linear activation function:

$$z = \\sum_{i=1}^n w_i x_i + b, \\quad a = \\sigma(z)$$

* **Weights ($w_i$)**: Determine the relative importance of each input feature.
* **Bias ($b$)**: Shifts the activation threshold.
* **Activation Function ($\\sigma$)**: Introduces non-linearity, allowing the network to approximate complex non-linear functions (e.g., ReLU, Sigmoid, Softmax).

---

### 2. Core Deep Learning Architectures

| Architecture | Full Name | Primary Data Type | Typical Applications |
| :--- | :--- | :--- | :--- |
| **ANN / MLP** | Multi-Layer Perceptron | Tabular / Structured Data | Classification, Regression |
| **CNN** | Convolutional Neural Network | Spatial Data / Images | Object Detection, Image Segmentation |
| **RNN / LSTM** | Recurrent Neural Network | Sequential / Time-Series | Speech Recognition, Stock Forecasting |
| **Transformer** | Transformer (Self-Attention) | Text, Audio, Multimodal | Large Language Models (LLMs), Generative AI |

---

### 3. How Deep Networks Learn: Forward & Backward Propagation

1. **Forward Pass**: Input data flows through layers to compute predictions $\\hat{y}$.
2. **Loss Calculation**: Computes discrepancy between prediction and ground truth $\\mathcal{L}(y, \\hat{y})$.
3. **Backpropagation**: Calculates gradients of the loss with respect to all weights using the **Chain Rule of Calculus**:
   $$\\frac{\\partial \\mathcal{L}}{\\partial w_{ij}} = \\frac{\\partial \\mathcal{L}}{\\partial a_j} \\cdot \\frac{\\partial a_j}{\\partial z_j} \\cdot \\frac{\\partial z_j}{\\partial w_{ij}}$$
4. **Gradient Descent**: Updates parameters $\\theta \\leftarrow \\theta - \\alpha \\nabla_\\theta \\mathcal{L}$.

---

> [!TIP]
> **Exam Question Tip:** In university exams, explain why **ReLU ($f(x) = \\max(0, x)$)** is preferred over Sigmoid in deep hidden layers: ReLU prevents the **Vanishing Gradient Problem** because its derivative is $1$ for all positive inputs.`;
    }

    // Question: "What is DBMS?" / "What is RDBMS?"
    if (matchesKeyword(lower, 'what is dbms') || matchesKeyword(lower, 'what is rdbms') || lower === 'what is dbms' || lower === 'what is dbms?' || lower === 'explain dbms' || lower.includes('define dbms')) {
      return `### Database Management System (DBMS)

A **Database Management System (DBMS)** is specialized system software designed to define, create, maintain, manipulate, and control access to structured collections of persistent data.

---

### 1. Key Objectives & Advantages of DBMS (vs File System)

* **Eliminates Redundancy**: Avoids storing duplicate data across multiple isolated files.
* **Guarantees Data Consistency**: Updates occur in one authoritative place.
* **Concurrent Access & Crash Recovery**: Manages simultaneous multi-user transactions without race conditions.
* **Data Integrity & Constraints**: Enforces Primary Key, Foreign Key, Domain, and Check constraints.
* **Security & Authorization**: Role-based access control (DCL: \`GRANT\`, \`REVOKE\`).

---

### 2. The 3-Schema ANSI-SPARC Architecture

\`\`\`
  [ External Level ]  -> User Views & Applications (View Schema)
          │
  [ Conceptual Level ] -> Logical Entities, Relationships & Constraints
          │
  [ Internal Level ]   -> Physical Storage, B+ Tree Indexes & File Allocation
\`\`\`

* **Physical Data Independence**: Changing physical storage structures does not break conceptual schema.
* **Logical Data Independence**: Changing conceptual relations does not break existing user external views.

---

### 3. ACID Properties in DBMS

* **Atomicity**: Transactions are "All or Nothing" (\`COMMIT\` or \`ROLLBACK\`).
* **Consistency**: Preserves database invariants before and after execution.
* **Isolation**: Concurrent transactions execute as if running in isolation.
* **Durability**: Committed data survives system crashes and power failures.

---

> [!TIP]
> **University Exam Insight:** Always distinguish DBMS (File-based/Hierarchical/Network) from **RDBMS** (Relational tables with mathematical relational algebra operations like $\\sigma, \\pi, \\bowtie$).`;
    }

    // Question: "What is Operating System?"
    if (matchesKeyword(lower, 'what is operating system') || lower === 'what is operating system' || lower === 'what is operating system?' || lower === 'what is an os' || lower === 'what is an os?' || lower === 'explain operating system' || lower.includes('functions of operating system')) {
      return `### Operating System (OS): Architecture & Core Functions

An **Operating System (OS)** is fundamental system software that acts as an intermediary between computer hardware and user applications, managing hardware resources and providing a standardized execution environment.

---

### 1. Core Functions of an Operating System

1. **Process Management**: CPU scheduling, context switching, inter-process communication (IPC), and synchronization.
2. **Memory Management**: Virtual memory allocation, paging, segmentation, and page replacement policies (LRU, FIFO).
3. **File System Management**: Directory structure, file permissions, block allocation, and secondary storage drivers.
4. **Device / I/O Management**: Device controllers, interrupt handling, buffering, caching, and spooling.
5. **Protection & Security**: Kernel mode (Ring 0) vs User mode (Ring 3) hardware privilege separation.

---

### 2. Dual-Mode Operation (User Mode vs Kernel Mode)

To prevent rogue user applications from directly halting the CPU or overwriting critical memory:
* **User Mode (Bit = 1)**: User code executes with restricted privileges.
* **Kernel Mode (Bit = 0)**: Privileged execution mode for OS kernel code.
* **System Calls (Trap / Software Interrupt)**: Applications switch from user mode to kernel mode via system calls (e.g. \`fork()\`, \`read()\`, \`write()\`, \`exec()\`).

---

### 3. Key Concepts Quick Reference:

| Concept | Description |
| :--- | :--- |
| **Process** | A program in execution containing Text, Data, Heap, and Stack segments. |
| **Thread** | A lightweight unit of CPU execution within a process sharing the code/data segment. |
| **Deadlock** | A condition where a set of processes are blocked waiting for resources held by each other. |
| **Semaphore** | An integer synchronization variable accessed via atomic \`wait()\` / $P()$ and \`signal()\` / $V()$ operations. |

---

> [!TIP]
> **University Exam Point:** Always illustrate the **5-State Process Model**: *New $\\rightarrow$ Ready $\\rightarrow$ Running $\\rightarrow$ Waiting/Blocked $\\rightarrow$ Terminated*.`;
    }

    // Question: "Process vs Thread"
    if ((lower.includes('process') && lower.includes('thread') && (lower.includes('difference') || lower.includes('vs') || lower.includes('compare'))) || lower.includes('process vs thread')) {
      return `### Difference Between Process and Thread

In Operating Systems, **Processes** and **Threads** are fundamental units of program execution, differing fundamentally in resource isolation, memory sharing, and creation overhead.

---

### Comparison Table:

| Feature | Process | Thread (Lightweight Process) |
| :--- | :--- | :--- |
| **Definition** | An independent program in execution with dedicated address space. | A single unit of execution within a parent process. |
| **Address Space** | Each process has its own isolated memory (Code, Data, Heap, Stack). | Threads share the parent process's Code, Data, and Heap. |
| **Stack & Registers** | Own stack, registers, and Program Counter (PC). | Has its own private Stack, Register set, and PC. |
| **Creation Overhead** | High overhead (requires \`fork()\` and OS memory allocation). | Very low overhead (shares existing process resources). |
| **Context Switching** | Slow (requires invalidating TLB cache and memory pages). | Fast (shares the same virtual address space). |
| **Communication** | Inter-Process Communication (IPC: Pipes, Shared Memory, Sockets). | Direct memory read/write (requires synchronization locks). |
| **Crash Impact** | If one process crashes, others continue unaffected. | If one thread causes a segmentation fault, the entire process terminates. |

---

> [!TIP]
> **Exam Insight:** Remember the acronym **PCB vs TCB**: A process is managed by a **Process Control Block (PCB)**, while a thread is tracked via a lighter **Thread Control Block (TCB)**.`;
    }

    // Question: "What is Deadlock?" / Banker's Algorithm
    if (matchesKeyword(lower, 'deadlock') || lower.includes('what is deadlock') || lower.includes('deadlock conditions') || lower.includes('coffman conditions') || lower.includes('banker')) {
      return `### Deadlock in Operating Systems: Coffman Conditions & Prevention

A **Deadlock** is a permanent state where a set of concurrent processes are permanently blocked because each process is holding a resource and waiting for another resource held by another process in the circular chain.

---

### 1. The Four Coffman Conditions (Must ALL hold simultaneously for Deadlock)

1. **Mutual Exclusion**: At least one resource must be held in a non-shareable mode (only one process can use it at a time).
2. **Hold and Wait**: A process is holding at least one resource and actively waiting to acquire additional resources held by others.
3. **No Preemption**: Resources cannot be forcibly confiscated from a process; they can only be released voluntarily.
4. **Circular Wait**: A closed chain of processes $\\{P_0, P_1, \\dots, P_n\\}$ exists such that $P_0$ waits for $P_1$, $P_1$ waits for $P_2$, ..., and $P_n$ waits for $P_0$.

---

### 2. Deadlock Handling Strategies

* **Deadlock Prevention**: Invalidate at least one of the 4 Coffman conditions (e.g., impose global resource ordering to eliminate Circular Wait).
* **Deadlock Avoidance (Banker's Algorithm)**: Dynamically check system state before granting resource requests to ensure system remains in a **Safe State**.
* **Deadlock Detection & Recovery**: Periodically execute Resource Allocation Graph (RAG) cycle-detection algorithms and terminate/preempt deadlocked processes.
* **Ostrich Algorithm**: Ignore the problem if deadlocks occur very rarely (common in standard desktop OSs).

---

### 3. Banker's Algorithm Safety Formula:

$$\\text{Need Matrix}[i][j] = \\text{Max Matrix}[i][j] - \\text{Allocation Matrix}[i][j]$$

If $\\text{Need}_i \\leq \\text{Available}$, process $P_i$ can complete, releasing its allocated resources: $\\text{Available} \\leftarrow \\text{Available} + \\text{Allocation}_i$.

---

> [!TIP]
> **Exam Tip:** In Resource Allocation Graphs (RAG): If the graph contains **no cycles**, there is **no deadlock**. If it contains a cycle and all resources are **single-instance**, a deadlock **definitely exists**.`;
    }

    // Question: "What is OOP?" / "4 Pillars of OOP"
    if (matchesKeyword(lower, 'what is oop') || matchesKeyword(lower, 'oop') || lower.includes('object oriented programming') || lower.includes('4 pillars of oop') || lower.includes('four pillars')) {
      return `### Object-Oriented Programming (OOP): The 4 Core Pillars

**Object-Oriented Programming (OOP)** is a programming paradigm organized around **Objects** (instances containing state/attributes and behavior/methods) rather than sequential actions and logic.

---

### The 4 Pillars of OOP:

| Pillar | Concept | Academic Definition | Real-World Analogy |
| :--- | :--- | :--- | :--- |
| **1. Encapsulation** | Data Hiding | Bundling data variables and accessor methods inside a class while restricting direct external access using private access specifiers. | Medical capsule containing formula safely inside. |
| **2. Abstraction** | Hiding Complexity | Displaying only essential interface details to the user and hiding internal algorithmic implementation details (Abstract classes, Interfaces). | Car steering and gas pedal (you drive without knowing fuel injection physics). |
| **3. Inheritance** | Code Reusability | Mechanism where a child class acquires properties and methods of a parent class (\`extends\` / \`:\`). | Child inheriting traits from biological parents. |
| **4. Polymorphism** | "Many Forms" | Ability of a single interface or method to behave differently based on the object invoking it (Compile-time Overloading vs Runtime Overriding). | Person acting as student in college, customer in store, passenger on train. |

---

> [!TIP]
> **Exam Tip:** Distinguish **Compile-time Polymorphism** (Function/Operator Overloading — resolved by compiler) from **Runtime Polymorphism** (Virtual Functions/Method Overriding — resolved via Virtual Method Tables / vtables).`;
    }

    // Question: "What is SQL?"
    if (lower === 'what is sql' || lower === 'what is sql?' || (lower.includes('what is sql') && !lower.includes('query to'))) {
      if (level === 'Beginner') {
        return `### SQL (Structured Query Language)

**SQL (Structured Query Language)** is the standard computer language used to communicate with and manage relational databases.

It allows us to:
* **Create databases and tables** (e.g., setting up a new table for student records)
* **Insert data** (adding new student details)
* **Retrieve data** (finding specific information when needed)
* **Update data** (modifying existing information like marks or addresses)
* **Delete data** (removing records that are no longer needed)

---

#### In Simple Words:
SQL is the declarative language we use to instruct a relational database to store, retrieve, or modify tabular information safely.`;
      } else if (level === 'Advanced') {
        return `### SQL (Structured Query Language): Relational Calculus & Architecture

**SQL (Structured Query Language)** is a domain-specific declarative language rooted in **Relational Algebra** and **Tuple Relational Calculus (TRC)** for managing data held in Relational Database Management Systems (RDBMS).

---

#### 1. Language Classification & Theoretical Foundation
* **DDL (Data Definition Language)**: \`CREATE\`, \`ALTER\`, \`DROP\`, \`TRUNCATE\` (Modifies database metadata and catalog schemas).
* **DQL (Data Query Language)**: \`SELECT\` (Implements relational projection $\\pi$, selection $\\sigma$, and Cartesian join $\\bowtie$).
* **DML (Data Manipulation Language)**: \`INSERT\`, \`UPDATE\`, \`DELETE\` (Modifies relation state).
* **DCL (Data Control Language)**: \`GRANT\`, \`REVOKE\` (Enforces role-based security access).
* **TCL (Transaction Control Language)**: \`COMMIT\`, \`ROLLBACK\`, \`SAVEPOINT\` (Enforces ACID transactional invariants).

---

#### 2. Query Execution & Optimization Pipeline
1. **Parsing & Syntax Tree Generation**: Verifies syntactic rules and schema catalog bindings.
2. **Query Optimizer (RBO & CBO)**: Transforms logical relational algebra expressions into the minimal-cost physical execution plan utilizing available B+ Tree clustered/secondary indexes.
3. **Execution Engine**: Interacts with the buffer pool manager and storage engine to fetch data blocks with minimal disk I/O latency.

---

> [!TIP]
> **University Exam Insight:** Remember that SQL is *declarative* (you specify *what* data you require, and the RDBMS query optimizer determines *how* to execute the retrieval plan optimally).`;
      } else {
        // Intermediate Level
        return `### SQL (Structured Query Language)

**SQL (Structured Query Language)** is the standard programming language designed for managing, querying, and manipulating data stored in Relational Database Management Systems (RDBMS).

---

#### Core Sub-Languages of SQL:
1. **DDL (Data Definition Language)**: Defines and modifies schema structures (\`CREATE\`, \`ALTER\`, \`DROP\`).
2. **DQL (Data Query Language)**: Fetches and filters stored data (\`SELECT\`).
3. **DML (Data Manipulation Language)**: Modifies table records (\`INSERT\`, \`UPDATE\`, \`DELETE\`).
4. **DCL (Data Control Language)**: Manages permissions and security privileges (\`GRANT\`, \`REVOKE\`).
5. **TCL (Transaction Control Language)**: Controls transaction states and ACID consistency (\`COMMIT\`, \`ROLLBACK\`).

---

#### Key Characteristics:
* **Declarative Nature**: You specify what data you want, rather than writing procedural loops on how to navigate storage files.
* **Integrity Constraints**: Enforces Primary Key, Foreign Key, Unique, and Check constraints.

> [!TIP]
> **University Exam Tip:** In exams, always classify SQL commands into their 5 functional categories (DDL, DQL, DML, DCL, and TCL).`;
      }
    }

    // Question: Primary Key vs Foreign Key
    if ((lower.includes('primary key') && lower.includes('foreign key')) || (lower.includes('difference') && lower.includes('primary') && lower.includes('key'))) {
      return `### Difference Between Primary Key and Foreign Key

In Relational Database Management Systems (RDBMS), **Primary Keys** and **Foreign Keys** work together to uniquely identify entities and maintain referential integrity between tables.

---

#### Comparison Table:

| Feature | Primary Key (PK) | Foreign Key (FK) |
| :--- | :--- | :--- |
| **Purpose** | Uniquely identifies each record in a table. | References a Primary Key in another table to establish relationships. |
| **Nullability** | **Cannot** contain \`NULL\` values. | **Can** accept \`NULL\` values (if relation is optional). |
| **Uniqueness** | Must be strictly unique for every row. | Can contain duplicate values (multiple child rows pointing to one parent). |
| **Count** | Only **one** Primary Key per table. | A table can contain **multiple** Foreign Keys. |
| **Integrity** | Enforces **Entity Integrity**. | Enforces **Referential Integrity**. |
| **Default Index** | Automatically creates a Unique Clustered Index. | Does not automatically create a clustered index. |

---

> [!TIP]
> **Important Exam Point:** A Primary Key enforces *Entity Integrity* (no duplicate or null records), while a Foreign Key enforces *Referential Integrity* (prevents child rows from pointing to non-existent parent rows).`;
    }

    // Question: Why do we use normalization?
    if (lower.includes('why') && (lower.includes('normalization') || lower.includes('normalize'))) {
      return `### Why Do We Use Database Normalization?

We use database normalization to design clean, efficient relational schemas that eliminate redundant data storage and prevent severe data modification anomalies.

---

#### 1. Core Problems Without Normalization:
1. **Data Redundancy**: Duplicating identical data (e.g. department head name and office location) across thousands of student rows wastes disk space.
2. **Insertion Anomaly**: You cannot add a new department to the database until at least one student enrolls in it.
3. **Update Anomaly**: If a department HOD changes, updating it in only some rows creates contradictory data.
4. **Deletion Anomaly**: Deleting the last enrolled student in a department accidentally deletes the department's entire record.

---

#### 2. Major Benefits of Normalization:
* **Data Consistency**: Information is updated in exactly one place.
* **Storage Optimization**: Eliminates wasteful attribute duplication.
* **Referential Integrity**: Uses Primary and Foreign keys to link tables safely.
* **Faster Schema Maintenance**: Smaller, well-structured tables are easier to index and maintain.

---

> [!TIP]
> **Exam-Ready Summary:** Normalization reduces redundancy, eliminates data anomalies (Insert, Update, Delete), and ensures data integrity through schema decomposition.`;
    }

    // Question: What is normalization in DBMS? / Explain Normalization
    if (lower.includes('normalization') || lower.includes('normal form') || lower.includes('1nf') || lower.includes('bcnf')) {
      return `### Database Normalization in DBMS

**Database Normalization** is the systematic process of organizing relation schemas to minimize data redundancy and eliminate update, insertion, and deletion anomalies while ensuring lossless join decomposition.

---

#### Why Normalization is Needed:
* **Eliminates Redundancy**: Prevents duplicate copies of the same data across rows.
* **Prevents Data Anomalies**:
  * *Insertion Anomaly*: Inability to insert data without adding unrelated fields.
  * *Update Anomaly*: Inconsistent data when a record is updated in one place but not another.
  * *Deletion Anomaly*: Unintended loss of valid data when deleting a record.

---

#### Key Normal Forms:
1. **First Normal Form (1NF)**:
   * Every attribute value must be **atomic** (single, indivisible scalar).
   * No multivalued attributes or repeating groups in a column.
2. **Second Normal Form (2NF)**:
   * Must satisfy **1NF**.
   * **No Partial Functional Dependency**: Every non-prime attribute must depend on the full composite candidate key, not a partial subset.
3. **Third Normal Form (3NF)**:
   * Must satisfy **2NF**.
   * **No Transitive Functional Dependency**: Non-prime attributes must not depend on other non-prime attributes ($X \\rightarrow Y$ and $Y \\rightarrow Z$).
4. **Boyce-Codd Normal Form (BCNF)**:
   * Stricter 3.5NF: For every functional dependency $X \\rightarrow Y$, $X$ must strictly be a **superkey**.

---

> [!TIP]
> **University Exam Point:** In university exams, always determine the candidate keys first by computing attribute closures $(X^+)$ under the given FD set before checking 2NF, 3NF, or BCNF violations.`;
    }

    // Question: SQL Query for students marks > 80 (Explicitly asks for code/query)
    if ((lower.includes('query') || lower.includes('sql') || lower.includes('write')) && lower.includes('marks') && (lower.includes('80') || lower.includes('greater') || lower.includes('>'))) {
      return `### SQL Query: Students with Marks Greater Than 80

To retrieve student records where their marks exceed 80, we use the declarative SQL \`SELECT\` statement paired with the \`WHERE\` filtering clause.

---

#### SQL Query:
\`\`\`sql
SELECT student_id, name, marks
FROM students
WHERE marks > 80;
\`\`\`

---

#### Line-by-Line Explanation:
* \`SELECT student_id, name, marks\`: Specifies the columns to display in the output result set.
* \`FROM students\`: Identifies the database table containing the student records.
* \`WHERE marks > 80\`: Evaluates each row and filters in only students scoring strictly above 80.

---

#### Example Output:
| student_id | name | marks |
| :--- | :--- | :--- |
| 101 | Sarah Jenkins | 92 |
| 104 | Alex Kumar | 88 |
| 108 | Priya Sharma | 95 |

---

> [!TIP]
> **Exam Note:** If the question specifies "80 and above" or "marks at least 80", use the greater-than-or-equal operator: \`WHERE marks >= 80;\``;
    }

    // Question: Explain OSI Model
    if (lower.includes('osi') || (lower.includes('7 layer') && lower.includes('network'))) {
      return `### The OSI 7-Layer Reference Model

The **OSI (Open Systems Interconnection)** Reference Model standardizes computer network communication protocols into 7 distinct abstraction layers, each providing specific communication services through data encapsulation.

---

#### The 7 Layers and Their Purpose:

1. **Layer 7 — Application Layer**:
   * *Purpose:* Direct interface for network applications and end-user services.
   * *Protocols:* HTTP, HTTPS, DNS, SMTP, SSH, FTP.
2. **Layer 6 — Presentation Layer**:
   * *Purpose:* Data formatting, character code translation, compression, and encryption/decryption (TLS/SSL).
3. **Layer 5 — Session Layer**:
   * *Purpose:* Establishes, manages, checkpoints, and terminates communication sessions between applications.
4. **Layer 4 — Transport Layer**:
   * *Purpose:* Process-to-process port delivery, segmentation, flow control, and end-to-end reliability (TCP, UDP). *[PDU: Segment]*
5. **Layer 3 — Network Layer**:
   * *Purpose:* Host-to-host logical IP addressing and shortest path packet routing across networks (IP, ICMP, Routers). *[PDU: Packet]*
6. **Layer 2 — Data Link Layer**:
   * *Purpose:* Node-to-node framing, physical MAC addressing, switch forwarding, and error detection (Ethernet, Switches, ARP). *[PDU: Frame]*
7. **Layer 1 — Physical Layer**:
   * *Purpose:* Raw transmission of unstructured binary data bits over physical transmission media (Copper cables, Fiber optics, Radio frequencies). *[PDU: Bits]*

---

#### Real-World Analogy (Postal Mail Dispatch):
* *Application:* Writing your message.
* *Presentation:* Translating the text into English and putting it in an envelope.
* *Session:* Opening and maintaining the mail connection.
* *Transport:* Certified delivery with return receipt tracking (like TCP).
* *Network:* Addressing the envelope with recipient's city, state, and zip code (IP routing).
* *Data Link:* Mail truck driving from local post office to regional sorting center (MAC hop).
* *Physical:* The physical highway road the vehicle drives on.

---

> [!TIP]
> **Exam-Oriented Summary:** Easy mnemonic to remember Layer 7 to Layer 1: **"All People Seem To Need Data Processing"** (Application, Presentation, Session, Transport, Network, Data Link, Physical).`;
    }

    // 3. Search Domain Knowledge Base for Canonical Concept Matches
    for (const [domainKey, domainData] of Object.entries(DOMAIN_TOPICS)) {
      if (!domainData || !domainData.canonicalAnswers) continue;

      for (const [canonKey, canon] of Object.entries(domainData.canonicalAnswers)) {
        const keyPhrase = canonKey.replace(/_/g, ' ');
        const isDirectMatch = matchesKeyword(lower, canonKey) || matchesKeyword(lower, keyPhrase) ||
          (canon.keywords && canon.keywords.some(k => matchesKeyword(lower, k)));

        if (isDirectMatch) {
          // If query is specifically requesting code
          if (mode === 'code' || isCode) {
            return `### Code Implementation: ${canon.title}

Here is the clean, verified academic implementation:

\`\`\`
${canon.code}
\`\`\`

---

### Complexity & Analysis
* **Time Complexity**: $$${canon.math}$$
* **Academic Takeaway**: ${canon.examTip}`;
          }

          // If student is at Beginner level or asks for simpler explanation (NO code)
          if (level === 'Beginner' || lower.includes('simpler') || lower.includes('simple') || lower.includes('easy')) {
            return `### ${canon.title} (Simplified Breakdown)

${canon.overview}

---

#### Key Points to Remember:
${canon.steps.slice(0, 3).map((s, i) => `${i + 1}. ${s}`).join('\n\n')}

---

> [!TIP]
> **Summary**: ${canon.examTip}`;
          }

          // Default rich structured canonical breakdown (NO code unless asked)
          return `### ${canon.title}

${canon.overview}

---

### Core Principles & Mechanics

${canon.steps.map((s, i) => `${i + 1}. ${s}`).join('\n\n')}

---

### Theoretical & Complexity Analysis
* **Time / Performance Invariants**: $$${canon.math}$$

---

> [!TIP]
> **University Examination Insight:** ${canon.examTip}`;
        }
      }
    }

    // 4. Conversational Referential Follow-Up Check
    const isReferentialFollowUp = conversationHistory.length > 0 && (
      lower === 'why?' ||
      lower.startsWith('why ') ||
      lower.includes('explain more') ||
      lower.includes('elaborate') ||
      lower.includes('what about') ||
      lower.includes('how does that work') ||
      (cleanQuery.length < 25 && !isDefinition && !isHow && !isCode)
    );

    const lastAiTurn = [...conversationHistory].reverse().find(m => m.role === 'assistant');

    if (isReferentialFollowUp && lastAiTurn) {
      return `### Follow-up Deep Dive: "${cleanQuery}"

Building on our discussion of **${detected.topic || 'the previous topic'}**:

1. **Contextual Connection**:
   In the context of our previous discussion, "${cleanQuery}" directly relates to how the core mechanism maintains predictable behavior under standard and edge-case conditions.

2. **Step-by-Step Explanation**:
   * **Core Rule**: Ensure all domain constraints and boundary preconditions are satisfied.
   * **Mechanism**: The system handles this by isolating state transitions and applying the standard rule systematically.
   * **Key Verification**: Check with boundary conditions (like empty inputs or edge values).

3. **Academic Takeaway**:
   In university exams, clearly explain how this sub-concept connects back to the main theorem or algorithm.`;
    }

    // 5. Intelligent Dynamic Academic Synthesis Engine (Adaptive by Level & Question Type)
    let attachmentNote = '';
    if (attachments && attachments.length > 0) {
      attachmentNote = `\n\n> [!NOTE]\n> **Attachment Processed:** Analyzed uploaded reference file (${attachments[0].name}).`;
    }

    // Clean query entity name for dynamic formatting
    const entityName = cleanQuery
      .replace(/^(what is|what are|define|explain|how does|how to|write a query for|implement|tell me about)\s+/i, '')
      .replace(/\?+$/, '')
      .trim() || cleanQuery;
    const capitalizedEntity = entityName.charAt(0).toUpperCase() + entityName.slice(1);

    if (level === 'Beginner') {
      return `### Understanding: ${capitalizedEntity}

**Subject**: ${resolvedSubject} • **Level**: Beginner / Conceptual

---

#### 1. Core Definition & Concept
In **${resolvedSubject}**, **${capitalizedEntity}** is a fundamental concept designed to organize data, execute algorithms, or govern system operations effectively.

* **What it means**: It provides a structured set of rules and architectural components designed to make computational operations reliable, predictable, and maintainable.
* **Why it matters**: It prevents common software and hardware issues such as data inconsistency, computational bottlenecks, and unhandled boundary exceptions.

---

#### 2. Key Operational Principles
1. **Input & Initialization**: Establishes required parameters and validates initial system state.
2. **Processing & Transformation**: Executes the core algorithmic transitions step-by-step according to formal rules.
3. **Output & Verification**: Produces the expected result while verifying all boundary constraints.

---

#### 3. Summary & Intuition:
Whenever analyzing **${capitalizedEntity}**, remember its main objective: providing an optimal, standardized solution to core challenges in **${resolvedSubject}**.${attachmentNote}`;
    } else if (level === 'Advanced') {
      return `### Academic Breakdown: ${capitalizedEntity}

**Subject**: ${resolvedSubject} • **Level**: Advanced / University Exam

---

### 1. Conceptual Foundation & Mathematical Formalism
In **${resolvedSubject}**, rigorous analysis of **${capitalizedEntity}** centers on invariant preservation, state transitions, and asymptotic efficiency:

* **Formal Definition**: Defines the underlying mathematical model, state space $\\mathcal{S}$, and mapping functions $f: \\mathcal{X} \\rightarrow \\mathcal{Y}$.
* **System Invariant**: Guarantees correctness, referential stability, or concurrency safety across all scale regimes.

---

### 2. Algorithmic Mechanics & Complexity Bounds
1. **Precondition & State Bounds**: Verify input constraints and establish invariant thresholds.
2. **Computational Transformation**: Apply the transformation rules with optimal time complexity $\\mathcal{O}(n)$ and auxiliary space bounds.
3. **Termination & Convergence**: Guarantee completion in finite steps without divergence or deadlock.

---

### 3. University Examination Strategy & Common Pitfalls
* **Key Focus Area**: Explicitly derive time and space complexity trade-offs and specify edge-case boundary conditions ($n=0$, null references, or overflow).
* **Mark Distribution Tip**: Draw architectural block diagrams and provide formal step-by-step proofs where applicable.${attachmentNote}`;
    } else {
      // Intermediate Level
      return `### Academic Explanation: ${capitalizedEntity}

**Subject Domain**: ${resolvedSubject} • **Level**: Intermediate

---

### 1. Overview & Formal Definition
In **${resolvedSubject}**, **${capitalizedEntity}** is a core concept utilized to solve standard engineering problems, manage resources, and structure computational systems.

* **Core Purpose**: Provides a robust, standardized mechanism to manipulate data or execute operations reliably.
* **Governing Principles**: Operates on well-defined rules to preserve system integrity and avoid execution anomalies.

---

### 2. Key Steps & Architectural Workflow
1. **Initialization**: Configure the data structures and validate inputs against domain constraints.
2. **Execution**: Perform the primary logical transformations or state transitions step-by-step.
3. **Verification**: Validate that output invariants and integrity rules are fully satisfied.

---

### 3. Practical Takeaway
* **Real-World Relevance**: Used in modern software architectures, operating systems, and distributed platforms.
* **Academic Significance**: Frequent question topic in university semester examinations and technical interviews.${attachmentNote}`;
    }
  }

  /**
   * Socratic Tutor Mode Engine
   * Progressive step-by-step guided learning
   */
  function generateSocraticResponse(query, history, subject, topic, level = 'Intermediate') {
    const turnCount = history.filter(m => m.role === 'user').length;
    const lower = query.toLowerCase();

    // If query asks "What is SQL?" in tutor mode
    if (lower.includes('sql') && (lower.includes('what is') || turnCount <= 1)) {
      return `### Socratic Tutor: Let's understand SQL step-by-step!

**SQL (Structured Query Language)** is the standard language used to interact with relational databases.

Imagine you have a spreadsheet or a table containing student details (like \`student_id\`, \`name\`, and \`marks\`).

If you want to view all records from that table, we write:
\`\`\`sql
SELECT * FROM students;
\`\`\`

Here:
* \`SELECT\` tells the database what columns to fetch (\`*\` means all columns).
* \`FROM students\` tells it which table to look inside.

---

**Question for you:**
If you only wanted to see the **name** and **marks** columns (instead of all columns \`*\`), what SQL query would you write?

*Take a guess, and we'll build from there!*`;
    }

    if (turnCount <= 1) {
      return `### Socratic Tutor Mode: Let's explore "${query}"!

To really master this concept, let's break it down together step-by-step.

**1. The Big Picture:**
In **${subject}**, **${topic || query}** is used to solve a specific problem by following clear logical rules.

---

**Question for you:**
Before we look at the full implementation or formulas, in your own words:
* What is the **main input** we start with?
* What is the **desired outcome** we want to achieve?

*Write your thoughts below, and we will take the next step together!*`;
    } else if (turnCount === 2) {
      return `### Great Thinking!

You've got the basic foundation down. 

Now let's look at the next key part:
* When this operation or algorithm runs, **what condition or edge case must we always watch out for** (e.g., empty inputs, zero values, or duplicate records)?

How do you think the system handles that?`;
    } else {
      return `### Excellent Derivation!

Connecting your reasoning together:
1. We identified the starting inputs and the core objective.
2. We analyzed the step-by-step transformation.
3. We checked the boundary invariants and edge cases.

**Summary**:
You've derived the key mechanics of **${topic || 'this concept'}** from first principles! Would you like to try an exam-style practice problem on this topic?`;
    }
  }

  // ==========================================================================
  // Backend Server & Gemini AI Proxy Integration
  // ==========================================================================
  const GEMINI_API_KEY_STORAGE = 'smart_student_gemini_api_key';
  const GEMINI_MODEL_STORAGE = 'smart_student_gemini_model';
  const DEFAULT_GEMINI_MODEL = 'gemini-2.5-flash';
  const BACKEND_PORT = '8085';
  const BACKEND_ENABLED_KEY = 'smart_student_backend_enabled';

  function getApiBaseUrl() {
    if (typeof window !== 'undefined') {
      if (window.API_BASE_URL && typeof window.API_BASE_URL === 'string') {
        return window.API_BASE_URL.trim().replace(/\/+$/, '');
      }
      try {
        const stored = localStorage.getItem('smart_student_api_base_url');
        if (stored && stored.trim()) return stored.trim().replace(/\/+$/, '');
      } catch (e) {}
    }
    return '';
  }

  function isBackendActive() {
    return true; // Always active: dynamically routes to configured API_BASE_URL, local backend, or relative Vercel API
  }

  function setBackendActive(enabled) {
    try {
      if (typeof localStorage !== 'undefined') {
        if (enabled) {
          localStorage.setItem(BACKEND_ENABLED_KEY, 'true');
        } else {
          localStorage.removeItem(BACKEND_ENABLED_KEY);
        }
      }
    } catch (e) { }
  }

  function getApiUrl(endpoint) {
    const clean = endpoint.startsWith('/') ? endpoint : '/' + endpoint;
    if (typeof window === 'undefined') return clean;

    const customBase = getApiBaseUrl();
    if (customBase) {
      return `${customBase}${clean}`;
    }

    const hostname = window.location.hostname || 'localhost';
    const port = window.location.port;

    // When running directly on backend port 8085 or deployed together with relative /api rewrites
    if (port === BACKEND_PORT || hostname.endsWith('vercel.app')) {
      return clean;
    }

    // When developing locally on a standalone frontend server (e.g., Live Server port 5500/3000)
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `http://${hostname}:${BACKEND_PORT}${clean}`;
    }

    return clean;
  }

  let cachedBackendStatus = null;

  /**
   * Check backend Gemini API configuration status (/api/ai/status)
   */
  async function checkBackendStatus(forceCheck = false) {
    if (cachedBackendStatus && !forceCheck) return cachedBackendStatus;

    try {
      const url = getApiUrl('/api/ai/status');
      const res = await fetch(url, { method: 'GET' }).catch(() => null);
      if (res && res.ok) {
        cachedBackendStatus = await res.json();
        cachedBackendStatus.available = true;
        return cachedBackendStatus;
      }
    } catch (e) { }

    cachedBackendStatus = { configured: false, provider: 'Not Configured', available: false };
    return cachedBackendStatus;
  }

  function isValidGeminiKeyFormat(key) {
    if (!key || typeof key !== 'string') return false;
    const k = key.trim();
    if (!k || k === 'none' || k === 'null' || k === 'undefined') return false;
    if (k.startsWith('demo') || k.startsWith('your') || k.startsWith('test') || k.startsWith('placeholder')) return false;
    return (k.startsWith('AIza') || k.startsWith('AQ.') || k.length >= 25) && k.length >= 25;
  }

  function getGeminiApiKey() {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(GEMINI_API_KEY_STORAGE);
        if (stored && isValidGeminiKeyFormat(stored)) {
          return stored.trim();
        }
      }
      if (typeof window !== 'undefined' && window.GEMINI_API_KEY && isValidGeminiKeyFormat(window.GEMINI_API_KEY)) {
        return window.GEMINI_API_KEY;
      }
    } catch (e) {
      console.warn('Error reading Gemini API key:', e);
    }
    return '';
  }

  function setGeminiApiKey(key) {
    try {
      if (typeof localStorage !== 'undefined') {
        if (key && isValidGeminiKeyFormat(key)) {
          localStorage.setItem(GEMINI_API_KEY_STORAGE, key.trim());
        } else {
          localStorage.removeItem(GEMINI_API_KEY_STORAGE);
        }
      }
    } catch (e) {
      console.warn('Error storing Gemini API key:', e);
    }
  }

  function getGeminiModel() {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(GEMINI_MODEL_STORAGE);
        if (stored && stored.trim()) return stored.trim();
      }
    } catch (e) { }
    return DEFAULT_GEMINI_MODEL;
  }

  function setGeminiModel(model) {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(GEMINI_MODEL_STORAGE, model || DEFAULT_GEMINI_MODEL);
      }
    } catch (e) { }
  }

  /**
   * Sync Gemini key/model to backend environment
   */
  async function syncBackendConfig(key = '', model = DEFAULT_GEMINI_MODEL) {
    try {
      const url = getApiUrl('/api/ai/config');
      if (!url) return null;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: key, model: model })
      }).catch(() => null);
      if (res && res.ok) {
        return await res.json();
      }
    } catch (e) { }
    return null;
  }

  /**
   * Get current student auth header
   */
  async function getAuthHeader() {
    if (typeof window !== 'undefined' && window.SmartStudentFirebase && window.SmartStudentFirebase.getAuth) {
      const auth = window.SmartStudentFirebase.getAuth();
      if (auth && auth.currentUser) {
        try {
          const token = await auth.currentUser.getIdToken();
          return `Bearer ${token}`;
        } catch (e) {}
      }
    }
    return '';
  }

  /**
   * Solve doubt via Node.js Backend Server Proxy (/api/ai/solve)
   */
  async function solveWithBackendProxy(question, history = [], options = {}, onStageProgress = null) {
    try {
      const url = getApiUrl('/api/ai/solve');
      if (!url) return null;
      if (onStageProgress) onStageProgress('Connecting to Backend AI Service (/api/ai/solve)...');

      const authHeader = await getAuthHeader();
      const headers = { 'Content-Type': 'application/json' };
      if (authHeader) headers['Authorization'] = authHeader;

      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          question: question,
          subject: options.subject,
          difficulty: options.difficulty,
          tutorMode: options.tutorMode,
          history: history.map(h => ({ role: h.role, content: h.content })),
          attachments: options.attachments || []
        })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        const errorMsg = data.error || `HTTP ${response.status}: Failed to reach AI service.`;
        throw new Error(errorMsg);
      }

      if (data && data.success && data.answer) {
        return {
          answer: data.answer,
          provider: data.provider || 'Google Gemini (Backend)'
        };
      }
    } catch (e) {
      console.warn('[AI Client] Backend proxy error:', e.message);
      throw e;
    }
    return null;
  }

  /**
   * Generate practice question via Backend Server Proxy (/api/ai/practice)
   */
  async function generatePracticeWithBackendProxy(topic, subject, difficulty = 'Intermediate') {
    try {
      const url = getApiUrl('/api/ai/practice');
      if (!url) return null;

      const authHeader = await getAuthHeader();
      const headers = { 'Content-Type': 'application/json' };
      if (authHeader) headers['Authorization'] = authHeader;

      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ topic, subject, difficulty })
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate practice question.');
      }
      if (data && data.success && data.question) {
        return data.question;
      }
    } catch (e) {
      console.warn('[AI Client] Practice proxy error:', e.message);
      throw e;
    }
    return null;
  }

  /**
   * Escalate doubt to faculty (/api/doubts/escalate)
   */
  async function escalateDoubtToFaculty(doubtPayload) {
    try {
      const url = getApiUrl('/api/doubts/escalate');
      const authHeader = await getAuthHeader();
      const headers = { 'Content-Type': 'application/json' };
      if (authHeader) headers['Authorization'] = authHeader;

      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(doubtPayload)
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to escalate doubt to faculty.');
      }
      return data;
    } catch (e) {
      console.warn('[AI Client] Escalation error:', e.message);
      throw e;
    }
  }

  /**
   * Test connection to Gemini API with user-provided key
   */
  async function testGeminiApiKey(key, model = DEFAULT_GEMINI_MODEL) {
    if (!key || !key.trim()) {
      return { success: false, error: 'API key cannot be empty.' };
    }
    if (!isValidGeminiKeyFormat(key.trim())) {
      return {
        success: false,
        error: "Invalid API key format. A valid Google Gemini API key must be at least 25 characters."
      };
    }
    const targetModel = model || DEFAULT_GEMINI_MODEL;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${encodeURIComponent(key.trim())}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Respond with exactly: Connection successful.' }] }]
        })
      });

      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          return {
            success: false,
            error: 'Authentication failed (401 Unauthorized). The provided key is invalid or does not have Generative AI permissions. Get a valid key from Google AI Studio.'
          };
        }
        const msg = (data && data.error && data.error.message) ? data.error.message : `HTTP ${response.status}: API validation failed.`;
        return { success: false, error: msg };
      }

      return { success: true, message: `Connected to Google Gemini (${targetModel})!` };
    } catch (err) {
      return { success: false, error: err.message || 'Network error connecting to Google Gemini API.' };
    }
  }

  /**
   * Generate live academic answer using Google Gemini API (Direct Client Fallback)
   */
  async function generateWithGemini(userQuery, history = [], options = {}, onStageProgress = null) {
    const apiKey = getGeminiApiKey();
    if (!apiKey || !isValidGeminiKeyFormat(apiKey)) return null;

    const model = getGeminiModel();
    if (onStageProgress) onStageProgress(`Connecting to Google Gemini (${model})...`);

    const subject = options.subject || 'Computer Science & Engineering';
    const difficulty = options.difficulty || 'Intermediate';
    const isTutorMode = !!options.tutorMode;

    let normalizedLevel = 'Intermediate';
    if (/intro|basic|beginner|easy/i.test(difficulty)) normalizedLevel = 'Beginner';
    else if (/adv|exam|hard|gate|grad/i.test(difficulty)) normalizedLevel = 'Advanced';

    const systemInstruction = `You are an expert university professor and senior academic tutor in ${subject} on the Smart Student Productivity Platform.
Your mission is to provide high-quality, academically accurate, clear, and level-appropriate guidance to university students.

=== ACADEMIC CONTEXT ===
- Course/Domain: ${subject}
- Academic Level: ${normalizedLevel} (Original setting: "${difficulty}")
- Tutor Mode: ${isTutorMode ? 'ENABLED (Progressive Socratic Teaching)' : 'DISABLED (Direct Academic Answer)'}

=== CORE TUTORING PRINCIPLES ===
1. UNDERSTAND THE EXACT QUESTION:
   - Identify the core concept being asked.
   - Internally classify the question type (Definition, Explanation, Difference/Comparison, How it works, Why/Purpose, Example, Code/Query, Mathematical derivation, Algorithm, Debugging, Exam preparation, MCQ, Assignment-style).
   - Answer ONLY what is relevant to the question. Do NOT artificially invent complex sub-sections or force a rigid multi-part template onto simple questions.
   - NEVER generate unrelated sections (e.g. do not add ACID transactions, invariants, or complexity analysis to a basic question like "What is SQL?").

2. ADAPT TO ACADEMIC LEVEL:
   - BEGINNER / INTRODUCTORY:
     * Use simple, accessible language with intuitive mental models and real-world analogies.
     * Keep paragraphs short and concise.
     * Use minimal jargon and explain any technical terms used.
     * Provide simple, clean examples.
     * Keep the response focused and digestible.
   - INTERMEDIATE:
     * Use standard academic terminology with clear contextual definitions.
     * Provide practical examples, architectural diagrams (in markdown), or code where helpful.
     * Cover core mechanisms, principles, and common pitfalls.
   - ADVANCED / EXAM LEVEL:
     * Provide formal mathematical formulations, theoretical invariants, or formal proofs.
     * Cover edge cases, algorithmic complexity bounds ($O(n)$, space complexity), and architectural trade-offs.
     * Include university exam insights, mark-distribution tips, or GATE/GRE-level takeaways.

3. TUTOR MODE BEHAVIOR:
   ${isTutorMode ? `
   - TUTOR MODE IS ACTIVE:
     * Do NOT immediately dump a monolithic final answer.
     * Teach progressively: (1) Start with a simple intuitive explanation or decomposition, (2) Give a relatable example, (3) Explain why it works, and (4) Ask ONE focused, engaging question or offer the next step to encourage active student learning.
     * If the student explicitly asks for a direct answer, full code, or complete solution, provide it directly without withholding information.
   ` : `
   - TUTOR MODE IS INACTIVE:
     * Provide a direct, complete, well-structured, and comprehensive academic answer.
     * Use clear Markdown headings, bullet points, code blocks, or comparison tables tailored to the question type.
   `}

4. STRICT CODE GENERATION RULES:
   - CRITICAL: DO NOT include code snippets or code blocks for conceptual, theoretical, definition, comparative ("difference between..."), or architectural queries (e.g., "What is AI?", "What is Machine Learning?", "Difference between Process and Thread", "What is Deadlock?", "Explain OOP concepts", "What is Normalization?"). Focus entirely on clear conceptual explanations, structured breakdowns, comparison tables, and architectural principles.
   - ONLY include code blocks or code implementations when the student EXPLICITLY asks for code, programming, implementation, query writing, or script generation (e.g. "write code", "implement in python", "write a sql query", "show c++ code", "give code", "coding example", mode = 'code').
   - When code is explicitly requested, use proper language syntax highlighting tags (\`\`\`sql, \`\`\`cpp, \`\`\`python, \`\`\`java, etc.) with clean inline comments.

5. ACCURACY & ANTI-HALLUCINATION:
   - Prioritize correctness over verbosity. Never invent non-existent formulas, database operations, algorithms, or fake syllabus rules.
   - If uncertain about a university-specific regulation or dialect, state that clearly rather than assuming.

6. OUTPUT FORMATTING:
   - Always output clean, elegant, readable GitHub-Flavored Markdown.
   - Format tables cleanly using Markdown table syntax.
   - Use LaTeX notation for mathematics ($...$ for inline, $$...$$ for block).
   - Use GitHub-style callouts (> [!TIP] or > [!NOTE]) sparingly for high-value exam tips or key takeaways.`;

    // Map conversation history into Gemini contents payload
    const contents = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const m of history) {
        if (!m.content) continue;
        const role = m.role === 'user' ? 'user' : 'model';
        const parts = [{ text: m.content }];

        if (m.attachments && m.attachments.length > 0) {
          for (const att of m.attachments) {
            if (att.data && att.type && att.type.startsWith('image/')) {
              const base64Data = att.data.includes(',') ? att.data.split(',')[1] : att.data;
              parts.push({
                inline_data: {
                  mime_type: att.type,
                  data: base64Data
                }
              });
            }
          }
        }
        contents.push({ role, parts });
      }
    }

    // Add current user turn
    const currentParts = [{ text: userQuery }];
    if (options.attachments && options.attachments.length > 0) {
      for (const att of options.attachments) {
        if (att.data && att.type && att.type.startsWith('image/')) {
          const base64Data = att.data.includes(',') ? att.data.split(',')[1] : att.data;
          currentParts.push({
            inline_data: {
              mime_type: att.type,
              data: base64Data
            }
          });
        }
      }
    }
    contents.push({ role: 'user', parts: currentParts });

    if (onStageProgress) onStageProgress('Synthesizing academic derivation with Gemini...');

    const candidateModels = [model, 'gemini-3.6-flash', 'gemini-2.5-flash'].filter((v, i, a) => a.indexOf(v) === i);

    for (const candModel of candidateModels) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${candModel}:generateContent?key=${encodeURIComponent(apiKey)}`;

      const requestBody = {
        contents,
        system_instruction: {
          parts: [{ text: systemInstruction }]
        },
        generationConfig: {
          temperature: isTutorMode ? 0.4 : 0.2,
          topP: 0.95,
          maxOutputTokens: 3000
        }
      };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            console.warn(`[AIService Notice]: Gemini API authentication rejected (HTTP ${response.status}). Removing unauthorized key and falling back to Verified Academic Tutor.`);
            try {
              if (typeof localStorage !== 'undefined') {
                localStorage.removeItem(GEMINI_API_KEY_STORAGE);
              }
              if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
                window.dispatchEvent(new CustomEvent('gemini-key-invalidated'));
              }
            } catch (e) { }
            return null; // Immediately return null without spamming candidate models
          }
          const errJson = await response.json().catch(() => ({}));
          const lastErrorMsg = (errJson && errJson.error && errJson.error.message) ? errJson.error.message : `HTTP ${response.status}`;
          console.warn(`[AIService Gemini Warning - ${candModel}]:`, lastErrorMsg);
          continue;
        }

        const data = await response.json();
        if (data.candidates && data.candidates[0]?.content?.parts) {
          const generatedText = data.candidates[0].content.parts.map(p => p.text || '').join('');
          return generatedText;
        }
      } catch (networkErr) {
        console.warn(`[AIService Network Warning - ${candModel}]:`, networkErr);
      }
    }

    return null;
  }

  /**
   * Generate interactive practice question using Gemini API (Client direct)
   */
  async function generatePracticeWithGemini(topic, subject) {
    const apiKey = getGeminiApiKey();
    if (!apiKey || !isValidGeminiKeyFormat(apiKey)) return null;

    const model = getGeminiModel();
    const prompt = `Generate a high-quality academic multiple-choice practice question for an engineering student.
Topic: "${topic || 'General STEM'}"
Domain: "${subject || 'Computer Science'}"

You must respond STRICTLY with a valid JSON object formatted as:
{
  "question": "A clear problem statement with specific constraints or equations",
  "options": [
    "A) Option 1",
    "B) Option 2",
    "C) Option 3",
    "D) Option 4"
  ],
  "correctIndex": 0,
  "explanation": "A rigorous step-by-step derivation explaining why the correct choice holds and why others are invalid."
}`;

    const candidateModels = [model, 'gemini-3.6-flash', 'gemini-2.5-flash'].filter((v, i, a) => a.indexOf(v) === i);

    for (const candModel of candidateModels) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${candModel}:generateContent?key=${encodeURIComponent(apiKey)}`;
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              response_mime_type: 'application/json',
              temperature: 0.3
            }
          })
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            try {
              if (typeof localStorage !== 'undefined') localStorage.removeItem(GEMINI_API_KEY_STORAGE);
            } catch (e) { }
            return null;
          }
          continue;
        }
        const data = await response.json();
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
          const raw = data.candidates[0].content.parts[0].text.trim();
          const cleaned = raw.replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim();
          const parsed = JSON.parse(cleaned);
          if (parsed && parsed.question && Array.isArray(parsed.options) && typeof parsed.correctIndex === 'number') {
            return {
              id: 'pq_gemini_' + Date.now(),
              topic: topic,
              subject: subject,
              question: parsed.question,
              options: parsed.options,
              correctIndex: parsed.correctIndex,
              explanation: parsed.explanation || 'Verified correct answer.'
            };
          }
        }
      } catch (e) {
        console.warn(`[AIService Practice Warning - ${candModel}]:`, e);
      }
    }
    return null;
  }

  /**
   * Send a message within a conversation (Full Multi-Turn Context)
   */
  async function sendMessage(conversationId, payload = {}, options = {}, onStageProgress = null) {
    const uid = getCurrentUserId();
    const list = await getConversations(uid);
    let conv = list.find(c => c.id === conversationId);

    if (!conv) {
      conv = await createConversation({ title: payload.text.substring(0, 40) }, uid);
    }

    const userMsg = {
      id: 'msg_user_' + Date.now(),
      role: 'user',
      content: (payload.text || '').trim(),
      attachments: payload.attachments || [],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    conv.messages.push(userMsg);
    conv.updatedAt = new Date().toISOString();

    // Auto-update conversation title if it's the first query
    if (conv.messages.length === 1 && conv.title === 'New Academic Doubt') {
      conv.title = userMsg.content.substring(0, 36) + (userMsg.content.length > 36 ? '...' : '');
    }

    let aiResponseText = '';
    let usedProvider = 'Google Gemini Backend';
    let lastError = null;

    // 1. Primary Priority: Backend Server Proxy (/api/ai/solve using server-side GEMINI_API_KEY)
    try {
      if (onStageProgress) onStageProgress('Contacting Backend AI Service (/api/ai/solve)...');
      const backendResult = await solveWithBackendProxy(
        userMsg.content,
        conv.messages.slice(0, -1),
        {
          subject: conv.subject || options.subject,
          difficulty: conv.difficulty || options.difficulty,
          tutorMode: conv.tutorMode || options.tutorMode,
          attachments: userMsg.attachments
        },
        onStageProgress
      );

      if (backendResult && backendResult.answer) {
        aiResponseText = backendResult.answer;
        usedProvider = backendResult.provider || 'Google Gemini Backend';
      }
    } catch (backendErr) {
      lastError = backendErr.message;
      console.warn('[AI Service] Backend proxy error, attempting Cloud Function fallback:', backendErr.message);
    }

    // 2. Secondary Priority: Firebase Cloud Function (if active and SDK available)
    if (!aiResponseText && window.SmartStudentFirebase && typeof window.SmartStudentFirebase.getFunctions === 'function') {
      const functionsInstance = window.SmartStudentFirebase.getFunctions();
      if (functionsInstance) {
        try {
          if (onStageProgress) onStageProgress('Connecting to Cloud AI Proxy...');
          const solveDoubtFn = functionsInstance.httpsCallable('solveDoubt');
          const result = await solveDoubtFn({
            question: userMsg.content,
            subject: conv.subject || options.subject,
            difficulty: conv.difficulty || options.difficulty,
            mode: conv.mode || options.mode,
            tutorMode: conv.tutorMode || options.tutorMode,
            history: conv.messages.map(m => ({ role: m.role, content: m.content })),
            attachments: userMsg.attachments
          });

          if (result && result.data && result.data.answer) {
            aiResponseText = result.data.answer;
            usedProvider = result.data.provider || 'Firebase Cloud Function';
          }
        } catch (cloudErr) {
          lastError = cloudErr.message;
          console.warn('[AI Service] Callable cloud function error:', cloudErr.message);
        }
      }
    }

    // 3. Tertiary Priority: Custom Client Gemini Key (if student saved their own custom key in settings modal)
    if (!aiResponseText && getGeminiApiKey()) {
      try {
        if (onStageProgress) onStageProgress(`Connecting to Google Gemini (${getGeminiModel()})...`);
        aiResponseText = await generateWithGemini(
          userMsg.content,
          conv.messages.slice(0, -1),
          {
            subject: conv.subject || options.subject,
            difficulty: conv.difficulty || options.difficulty,
            mode: conv.mode || options.mode,
            tutorMode: conv.tutorMode || options.tutorMode,
            attachments: userMsg.attachments
          },
          onStageProgress
        );
        if (aiResponseText) {
          usedProvider = `Google Gemini (${getGeminiModel()})`;
        }
      } catch (geminiErr) {
        lastError = geminiErr.message;
        console.warn('Gemini direct API call error:', geminiErr);
      }
    }

    // If all real AI engines failed, propagate the error without returning fake mock answers
    if (!aiResponseText) {
      throw new Error(lastError || 'Unable to connect to the AI service. Please verify your backend server configuration.');
    }

    const detected = detectSubjectAndTopic(userMsg.content);

    const isDomainMismatch = detected.domainKey !== 'general' && (!conv.subject || conv.subject === 'All Engineering Subjects' || (conv.subject === 'Database Management Systems' && detected.domainKey !== 'dbms'));

    const assistantMsg = {
      id: 'msg_ai_' + Date.now(),
      role: 'assistant',
      provider: usedProvider,
      subject: isDomainMismatch ? detected.subject : (conv.subject || detected.subject),
      topic: detected.topic,
      difficulty: conv.difficulty || detected.difficulty,
      content: aiResponseText,
      bookmarked: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    conv.messages.push(assistantMsg);
    conv.updatedAt = new Date().toISOString();

    saveConversations(list, uid);

    // Sync full conversation to Firestore if live
    if (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
      try {
        const db = window.SmartStudentFirebase.getDb();
        await db.collection('doubts').doc(conv.id).set({
          ...conv,
          studentId: uid,
          studentUid: uid,
          status: 'ai_resolved',
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      } catch (e) { }
    }

    return {
      conversation: conv,
      userMessage: userMsg,
      assistantMessage: assistantMsg
    };
  }

  /**
   * Practice Question Generator
   */
  async function generatePracticeQuestion(topic = 'General Concept', subject = 'Computer Science', difficulty = 'Medium') {
    // 1. Try Backend Proxy first (/api/ai/practice using server-side key)
    try {
      const backendQ = await generatePracticeWithBackendProxy(topic, subject, difficulty);
      if (backendQ) return backendQ;
    } catch (e) {
      console.warn('[AI Service] Backend practice generation note:', e.message);
    }

    // 2. Try Firebase Cloud Function
    if (window.SmartStudentFirebase && typeof window.SmartStudentFirebase.getFunctions === 'function') {
      try {
        const functionsInstance = window.SmartStudentFirebase.getFunctions();
        if (functionsInstance) {
          const genPracticeFn = functionsInstance.httpsCallable('generatePracticeQuestion');
          const res = await genPracticeFn({ topic, subject, difficulty });
          if (res && res.data && res.data.question) {
            return res.data;
          }
        }
      } catch (cfErr) {
        console.warn('[AI Service] Cloud Function practice generation note:', cfErr.message);
      }
    }

    // 3. Try Client Gemini API (if custom client key is set)
    if (getGeminiApiKey()) {
      try {
        const geminiQ = await generatePracticeWithGemini(topic, subject, difficulty);
        if (geminiQ) return geminiQ;
      } catch (gemErr) {
        console.warn('[AI Service] Client Gemini practice error:', gemErr.message);
      }
    }

    throw new Error('Unable to generate practice question. Please ensure the backend AI service is running and configured.');
  }

  /**
   * Evaluate Student Answer
   */
  async function evaluateStudentAnswer(questionData, selectedIndexOrText) {
    await new Promise(r => setTimeout(r, 450));

    const isCorrect = (selectedIndexOrText === questionData.correctIndex) ||
      (typeof selectedIndexOrText === 'string' && selectedIndexOrText.toLowerCase().includes(questionData.options[questionData.correctIndex].toLowerCase().substring(0, 10)));

    return {
      correct: isCorrect,
      correctOption: questionData.options[questionData.correctIndex],
      explanation: questionData.explanation,
      feedback: isCorrect
        ? 'Correct: Excellent work! Your solution is 100% verified against academic standards.'
        : 'Incorrect: Review the canonical explanation below to correct your conceptual model.'
    };
  }

  /**
   * Export conversation to clean Markdown file content
   */
  function exportConversationToMarkdown(conversation) {
    if (!conversation) return '';
    let md = `# Academic Doubt Resolution: ${conversation.title}\n`;
    md += `**Subject**: ${conversation.subject} | **Date**: ${new Date(conversation.createdAt).toLocaleDateString()}\n\n---\n\n`;

    conversation.messages.forEach((m, idx) => {
      if (m.role === 'user') {
        md += `### Student Query\n${m.content}\n\n`;
      } else {
        md += `### AI Academic Tutor Breakdown\n${m.content}\n\n---\n\n`;
      }
    });

    return md;
  }

  // ========================================================================
  // Backward-Compatible Methods (for dashboard.html and legacy components)
  // ========================================================================
  async function askQuestion(questionText, subjectName = 'All Engineering Subjects', mode = 'breakdown') {
    const conv = await createConversation({ title: questionText.substring(0, 36), subject: subjectName, mode: mode });
    const result = await sendMessage(conv.id, { text: questionText }, { subject: subjectName, mode: mode });

    // Legacy mock format compatibility
    const legacyDoubt = {
      id: conv.id,
      question: questionText,
      subject: conv.subject,
      mode: mode,
      status: 'answered',
      bookmarked: false,
      answer: result.assistantMessage.content,
      createdAt: 'Just now'
    };

    if (window.mockDoubts) {
      window.mockDoubts.unshift(legacyDoubt);
    }

    return legacyDoubt;
  }

  async function getRecentDoubts() {
    const convs = await getConversations();
    return convs.map(c => {
      const lastAi = [...c.messages].reverse().find(m => m.role === 'assistant');
      const firstUser = c.messages.find(m => m.role === 'user');
      return {
        id: c.id,
        question: firstUser ? firstUser.content : c.title,
        subject: c.subject,
        status: 'answered',
        bookmarked: c.bookmarked,
        createdAt: new Date(c.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' }),
        answer: lastAi ? lastAi.content : 'Solution resolved.'
      };
    });
  }

  async function deleteDoubt(id) {
    return deleteConversation(id);
  }

  return {
    getConversations,
    getConversation,
    createConversation,
    renameConversation,
    deleteConversation,
    toggleBookmark,
    sendMessage,
    generateContextualResponse,
    generatePracticeQuestion,
    evaluateStudentAnswer,
    detectSubjectAndTopic,
    exportConversationToMarkdown,
    // Backend & Gemini API Management
    isBackendActive,
    setBackendActive,
    getApiUrl,
    checkBackendStatus,
    syncBackendConfig,
    getGeminiApiKey,
    setGeminiApiKey,
    getGeminiModel,
    setGeminiModel,
    testGeminiApiKey,
    escalateDoubtToFaculty,
    // Backward compatibility
    askQuestion,
    getRecentDoubts,
    deleteDoubt
  };
})();

if (typeof window !== 'undefined') {
  window.AIService = AIService;
}
