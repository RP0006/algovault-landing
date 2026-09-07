export interface DsaTopic {
  id: string;
  name: string;
  category: string;
  tagline: string;
  iconName: string;
  summary: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  invariants: string[];
  canonicalProblems: {
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    platform: 'LeetCode' | 'Codeforces';
    idOrNumber: string;
    url: string;
    coreIdea: string;
  }[];
  interactiveSteps: {
    step: number;
    title: string;
    stateVisual: string[];
    explanation: string;
  }[];
}

export const DSA_TOPICS: DsaTopic[] = [
  {
    id: 'arrays-two-pointers',
    name: 'Arrays & Two Pointers',
    category: 'Core Data Structures',
    tagline: 'Shrink search space and eliminate redundant nested loops',
    iconName: 'Layers',
    summary:
      'Arrays provide O(1) random access by index. The Two-Pointer technique uses opposing or fast/slow pointers to reduce O(N²) brute-force inspections down to O(N) linear scans by exploiting monotonicity and sorted invariants.',
    timeComplexity: {
      best: 'O(N)',
      average: 'O(N)',
      worst: 'O(N)',
    },
    spaceComplexity: 'O(1) auxiliary space',
    invariants: [
      'In sorted arrays, if sum < target, increment left pointer to increase total sum.',
      'If sum > target, decrement right pointer to decrease total sum.',
      'Container With Most Water: Always advance the pointer pointing to the shorter boundary.',
      'Trapping Rain Water: Min(maxLeft, maxRight) strictly dictates water height above index i.',
    ],
    canonicalProblems: [
      {
        title: 'Trapping Rain Water',
        difficulty: 'Hard',
        platform: 'LeetCode',
        idOrNumber: '42',
        url: 'https://leetcode.com/problems/trapping-rain-water/',
        coreIdea: 'Maintain maxLeft and maxRight pointers. Advance the smaller boundary to accumulate water in O(N) time and O(1) space.',
      },
      {
        title: '3Sum',
        difficulty: 'Medium',
        platform: 'LeetCode',
        idOrNumber: '15',
        url: 'https://leetcode.com/problems/3sum/',
        coreIdea: 'Sort array, fix first number, then reduce remaining pair to standard Two Pointers while skipping duplicates.',
      },
      {
        title: 'Container With Most Water',
        difficulty: 'Medium',
        platform: 'LeetCode',
        idOrNumber: '11',
        url: 'https://leetcode.com/problems/container-with-most-water/',
        coreIdea: 'Move the shorter vertical line inward because keeping the shorter line cannot yield a larger volume with decreased width.',
      },
    ],
    interactiveSteps: [
      {
        step: 1,
        title: 'Initialize pointers at array boundaries',
        stateVisual: ['[L=0: 0]', '1', '0', '2', '1', '0', '1', '3', '2', '1', '2', '[R=11: 1]'],
        explanation: 'left=0, right=11. maxLeft=0, maxRight=1. Since height[left] <= height[right], water trapped at left is bounded by maxLeft.',
      },
      {
        step: 2,
        title: 'Advance left pointer & update maxLeft',
        stateVisual: ['0', '[L=1: 1]', '0', '2', '1', '0', '1', '3', '2', '1', '2', '[R=11: 1]'],
        explanation: 'height[1]=1 >= maxLeft(0). Update maxLeft=1. Water added = 0.',
      },
      {
        step: 3,
        title: 'Encounter valley at index 2',
        stateVisual: ['0', '1', '[L=2: 0]', '2', '1', '0', '1', '3', '2', '1', '2', '[R=11: 1]'],
        explanation: 'height[2]=0 < maxLeft(1). Trapped water += maxLeft - height[2] = 1 - 0 = 1 unit!',
      },
    ],
  },
  {
    id: 'linked-lists',
    name: 'Linked Lists',
    category: 'Linear Structures',
    tagline: 'Pointer manipulation, sentinel nodes, and cycle detection',
    iconName: 'GitCommit',
    summary:
      'Singly and doubly linked lists represent sequences connected via memory pointers. Key techniques include dummy/sentinel heads to eliminate null-checks, fast/slow Floyd cycle detection, and in-place pointer reversal.',
    timeComplexity: {
      best: 'O(1) insertion at head',
      average: 'O(N) search / lookup',
      worst: 'O(N) traversal',
    },
    spaceComplexity: 'O(1) in-place operations',
    invariants: [
      'Floyd Cycle: slow moves 1 step, fast moves 2 steps. If cycle exists, they intersect in O(N).',
      'Cycle Start: Once met, reset one pointer to head and move both at 1 step; collision point is the cycle origin.',
      'Reverse List: Always save next pointer before redirecting curr.next = prev.',
      'Dummy Head: Always attach dummy.next = head when head might be modified or deleted.',
    ],
    canonicalProblems: [
      {
        title: 'Reverse Linked List',
        difficulty: 'Easy',
        platform: 'LeetCode',
        idOrNumber: '206',
        url: 'https://leetcode.com/problems/reverse-linked-list/',
        coreIdea: 'Three-pointer slide: prev, curr, nextTemp. Reorient pointers in single pass.',
      },
      {
        title: 'Linked List Cycle II',
        difficulty: 'Medium',
        platform: 'LeetCode',
        idOrNumber: '142',
        url: 'https://leetcode.com/problems/linked-list-cycle-ii/',
        coreIdea: 'Floyd Tortoise & Hare to find collision, then mathematical proof gives distance to loop entrance.',
      },
      {
        title: 'Merge k Sorted Lists',
        difficulty: 'Hard',
        platform: 'LeetCode',
        idOrNumber: '23',
        url: 'https://leetcode.com/problems/merge-k-sorted-lists/',
        coreIdea: 'Min-heap priority queue storing heads of k lists, yielding O(N log k) total runtime.',
      },
    ],
    interactiveSteps: [
      {
        step: 1,
        title: 'Setup Slow and Fast pointers',
        stateVisual: ['[S, F -> Node 1]', '-> Node 2', '-> Node 3', '-> Node 4', '-> (loops back to Node 2)'],
        explanation: 'Both pointers start at the head node before traversing.',
      },
      {
        step: 2,
        title: 'Advance: S by 1, F by 2',
        stateVisual: ['Node 1', '-> [S -> Node 2]', '-> [F -> Node 3]', '-> Node 4'],
        explanation: 'Fast pointer covers twice the distance per iteration.',
      },
      {
        step: 3,
        title: 'Pointers collide inside cycle',
        stateVisual: ['Node 1', '-> Node 2', '-> Node 3', '-> [S & F collide at Node 4!]'],
        explanation: 'Collision proves the existence of a cycle without allocating extra hash memory.',
      },
    ],
  },
  {
    id: 'stack-monotonic',
    name: 'Stack & Monotonic Stack',
    category: 'LIFO Collections',
    tagline: 'Next Greater Element, balanced parenthesis, and histogram optimization',
    iconName: 'Server',
    summary:
      'Stacks operate via Last-In-First-Out (LIFO). A Monotonic Stack preserves strict ascending or descending order of elements, allowing Next Greater / Smaller Element queries in amortized O(1) per element.',
    timeComplexity: {
      best: 'O(1) push / pop',
      average: 'O(N) total across N pushes',
      worst: 'O(N) overall pass',
    },
    spaceComplexity: 'O(N) stack capacity',
    invariants: [
      'Monotonic Decreasing Stack: stack stores elements in decreasing order. When a larger element arrives, pop smaller ones.',
      'Each element is pushed exactly once and popped at most once; total amortized cost is O(2N) = O(N).',
      'Largest Rectangle in Histogram: Width extends from current index to the previous smaller item left on stack.',
    ],
    canonicalProblems: [
      {
        title: 'Daily Temperatures',
        difficulty: 'Medium',
        platform: 'LeetCode',
        idOrNumber: '739',
        url: 'https://leetcode.com/problems/daily-temperatures/',
        coreIdea: 'Monotonic decreasing stack of indices. Pop when current temp > stack top temp.',
      },
      {
        title: 'Largest Rectangle in Histogram',
        difficulty: 'Hard',
        platform: 'LeetCode',
        idOrNumber: '84',
        url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',
        coreIdea: 'Maintain monotonic increasing heights. When a drop occurs, pop and calculate rectangle width.',
      },
      {
        title: 'Valid Parentheses',
        difficulty: 'Easy',
        platform: 'LeetCode',
        idOrNumber: '20',
        url: 'https://leetcode.com/problems/valid-parentheses/',
        coreIdea: 'Push matching closing brackets. On closing symbol, assert equality with stack top.',
      },
    ],
    interactiveSteps: [
      {
        step: 1,
        title: 'Push first element onto stack',
        stateVisual: ['Input: [73, 74, 75, 71, 69, 72, 76, 73]', 'Stack: [index 0 (73)]'],
        explanation: 'Stack keeps indices to calculate distance once warmer day is discovered.',
      },
      {
        step: 2,
        title: 'Current 74 > Stack Top 73 -> Pop!',
        stateVisual: ['Input at index 1: 74', 'Pop index 0!', 'Result[0] = 1 - 0 = 1 day', 'Stack now: [index 1 (74)]'],
        explanation: 'Next greater element found for index 0 in 1 day.',
      },
      {
        step: 3,
        title: 'Push descending elements [75, 71, 69]',
        stateVisual: ['Stack: [index 2 (75)]', '-> [index 3 (71)]', '-> [index 4 (69)]'],
        explanation: 'Order is maintained monotonically until an increasing value (72) arrives.',
      },
    ],
  },
  {
    id: 'queue-deque',
    name: 'Queue & Monotonic Deque',
    category: 'FIFO Collections',
    tagline: 'Breadth-First Search, sliding window maximums, and buffer queues',
    iconName: 'Shuffle',
    summary:
      'Queues enforce First-In-First-Out (FIFO) access. A double-ended queue (Deque) supports O(1) push and pop at both ends, forming the foundation of Sliding Window Maximum and Level-Order Graph traversals.',
    timeComplexity: {
      best: 'O(1) enqueue/dequeue',
      average: 'O(1) amortized',
      worst: 'O(1) per element',
    },
    spaceComplexity: 'O(K) window size or O(W) tree width',
    invariants: [
      'Sliding Window Deque: Store indices in monotonic decreasing order of values.',
      'Front of deque always holds the maximum element of the current window.',
      'Remove front if index <= window_left (expired index).',
      'Remove back if current value >= value at back (useless smaller candidates).',
    ],
    canonicalProblems: [
      {
        title: 'Sliding Window Maximum',
        difficulty: 'Hard',
        platform: 'LeetCode',
        idOrNumber: '239',
        url: 'https://leetcode.com/problems/sliding-window-maximum/',
        coreIdea: 'Monotonic deque of indices maintaining decreasing order of values. Front is always max.',
      },
      {
        title: 'Design Circular Queue',
        difficulty: 'Medium',
        platform: 'LeetCode',
        idOrNumber: '622',
        url: 'https://leetcode.com/problems/design-circular-queue/',
        coreIdea: 'Fixed-size array with modulo arithmetic: (head + count) % size.',
      },
    ],
    interactiveSteps: [
      {
        step: 1,
        title: 'Window 1: elements [1, 3, -1]',
        stateVisual: ['Deque: [3, -1]', 'Current Max: 3'],
        explanation: '1 was discarded because 3 is larger and arrived later.',
      },
      {
        step: 2,
        title: 'Slide right: incoming element -3',
        stateVisual: ['Window: [3, -1, -3]', 'Deque: [3, -1, -3]', 'Current Max: 3'],
        explanation: '-3 is appended because it might become max after 3 and -1 expire.',
      },
    ],
  },
  {
    id: 'trees-bst',
    name: 'Trees & Binary Search Trees',
    category: 'Hierarchical Structures',
    tagline: 'DFS traversals, Lowest Common Ancestor, and BST invariants',
    iconName: 'Network',
    summary:
      'Trees model non-linear hierarchical relationships. Binary Search Trees (BST) guarantee left.val < node.val < right.val, enabling O(log N) lookup and in-order traversals that naturally yield sorted sequences.',
    timeComplexity: {
      best: 'O(log N) balanced lookup',
      average: 'O(log N)',
      worst: 'O(N) degenerate skewed tree',
    },
    spaceComplexity: 'O(H) recursion stack height',
    invariants: [
      'In-Order Traversal of BST: Left -> Root -> Right yields strictly increasing numbers.',
      'Lowest Common Ancestor (LCA): First node where p and q split into left and right subtrees.',
      'Balanced Tree: Absolute difference between left and right subtree heights <= 1 at every node.',
    ],
    canonicalProblems: [
      {
        title: 'Lowest Common Ancestor of a Binary Tree',
        difficulty: 'Medium',
        platform: 'LeetCode',
        idOrNumber: '236',
        url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',
        coreIdea: 'Post-order DFS returns non-null when either p or q is found. If both sides return non-null, root is LCA.',
      },
      {
        title: 'Validate Binary Search Tree',
        difficulty: 'Medium',
        platform: 'LeetCode',
        idOrNumber: '98',
        url: 'https://leetcode.com/problems/validate-binary-search-tree/',
        coreIdea: 'Pass valid (minBound, maxBound) intervals down recursion stack.',
      },
      {
        title: 'Binary Tree Maximum Path Sum',
        difficulty: 'Hard',
        platform: 'LeetCode',
        idOrNumber: '124',
        url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/',
        coreIdea: 'Bottom-up post-order returns max single path branch, updates global arch sum node + left + right.',
      },
    ],
    interactiveSteps: [
      {
        step: 1,
        title: 'Root inspects bounds (-inf, +inf)',
        stateVisual: ['Node 5: valid inside (-inf, +inf)'],
        explanation: 'Root establishes bounds for all descendants.',
      },
      {
        step: 2,
        title: 'Left child constrained to (-inf, 5)',
        stateVisual: ['Left Child 3: valid inside (-inf, 5)'],
        explanation: 'All nodes in left subtree must be strictly less than 5.',
      },
      {
        step: 3,
        title: 'Right child constrained to (5, +inf)',
        stateVisual: ['Right Child 8: valid inside (5, +inf)'],
        explanation: 'All nodes in right subtree must be strictly greater than 5.',
      },
    ],
  },
  {
    id: 'graphs-bfs-dfs',
    name: 'Graphs, BFS & DFS',
    category: 'Relational Networks',
    tagline: 'Topological sort, shortest path unweighted, and cycle detection',
    iconName: 'Share2',
    summary:
      'Graphs represent vertices connected by directed or undirected edges. Breadth-First Search (BFS) finds shortest paths in unweighted graphs, while Depth-First Search (DFS) powers connected components and topological sort (Kahn\'s algorithm).',
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
    },
    spaceComplexity: 'O(V) visited set + queue/recursion',
    invariants: [
      'Unweighted Shortest Path: BFS visits nodes in strictly non-decreasing distance layers.',
      'Topological Sort: Directed Acyclic Graph (DAG) can be ordered if and only if indegree reduces to 0 for all V vertices.',
      'Cycle in Directed Graph: Three-color DFS (WHITE=unvisited, GRAY=in-current-path, BLACK=finished). A gray neighbor indicates a cycle.',
    ],
    canonicalProblems: [
      {
        title: 'Course Schedule (Topological Sort)',
        difficulty: 'Medium',
        platform: 'LeetCode',
        idOrNumber: '207',
        url: 'https://leetcode.com/problems/course-schedule/',
        coreIdea: "Kahn's algorithm using in-degree array and queue. If total processed courses == numCourses, valid.",
      },
      {
        title: 'Number of Islands',
        difficulty: 'Medium',
        platform: 'LeetCode',
        idOrNumber: '200',
        url: 'https://leetcode.com/problems/number-of-islands/',
        coreIdea: 'Grid BFS/DFS flood-fill sink visited 1s to 0s to avoid allocating extra hash table.',
      },
      {
        title: 'Word Ladder',
        difficulty: 'Hard',
        platform: 'LeetCode',
        idOrNumber: '127',
        url: 'https://leetcode.com/problems/word-ladder/',
        coreIdea: 'Bidirectional BFS from startWord and endWord yields exponential search space reduction.',
      },
    ],
    interactiveSteps: [
      {
        step: 1,
        title: 'Compute in-degrees for all course nodes',
        stateVisual: ['Course 0: in-degree 0', 'Course 1: in-degree 1 (req: 0)', 'Course 2: in-degree 1 (req: 0)'],
        explanation: 'Course 0 has no prerequisites and is ready to enroll.',
      },
      {
        step: 2,
        title: 'Enqueue 0, take course, decrement neighbors',
        stateVisual: ['Queue: [0] -> Process 0', 'Course 1 in-degree: 1 -> 0!', 'Course 2 in-degree: 1 -> 0!'],
        explanation: 'Fulfilling Course 0 unlocks both Course 1 and Course 2.',
      },
    ],
  },
  {
    id: 'dynamic-programming',
    name: 'Dynamic Programming',
    category: 'Optimization Paradigms',
    tagline: 'Optimal substructure, overlapping subproblems, and state compression',
    iconName: 'Binary',
    summary:
      'Dynamic Programming (DP) breaks complex optimization problems into overlapping subproblems. By memoizing or tabulating subproblem answers, exponential O(2^N) brute-force recursion is compressed into polynomial O(N) or O(N*W) time.',
    timeComplexity: {
      best: 'O(N) to O(N * W)',
      average: 'O(States * Transitions)',
      worst: 'O(States * Transitions)',
    },
    spaceComplexity: 'O(States) or O(1) space rolling array',
    invariants: [
      'Bellman Principle of Optimality: An optimal policy has the property that whatever initial state and decision are, the remaining decisions must constitute an optimal policy.',
      'State Definition: Clearly identify what parameters uniquely identify a subproblem (e.g. dp[i][w]).',
      'Base Cases: Initialize impossible states with infinity and known boundaries with 0.',
      'Space Rolling: If dp[i] only depends on dp[i-1], compress full table to two rows or a single backward array.',
    ],
    canonicalProblems: [
      {
        title: 'Coin Change',
        difficulty: 'Medium',
        platform: 'LeetCode',
        idOrNumber: '322',
        url: 'https://leetcode.com/problems/coin-change/',
        coreIdea: 'dp[amount] = min(dp[amount - coin] + 1). Bottom up tabulation initialized to infinity.',
      },
      {
        title: 'Longest Increasing Subsequence (LIS)',
        difficulty: 'Medium',
        platform: 'LeetCode',
        idOrNumber: '300',
        url: 'https://leetcode.com/problems/longest-increasing-subsequence/',
        coreIdea: 'O(N log N) patience sorting / binary search tails array maintaining smallest tail for each length.',
      },
      {
        title: 'Edit Distance',
        difficulty: 'Hard',
        platform: 'LeetCode',
        idOrNumber: '72',
        url: 'https://leetcode.com/problems/edit-distance/',
        coreIdea: 'dp[i][j] = 1 + min(insert dp[i][j-1], delete dp[i-1][j], replace dp[i-1][j-1]).',
      },
    ],
    interactiveSteps: [
      {
        step: 1,
        title: 'Initialize 1D DP array of size amount + 1',
        stateVisual: ['dp = [0, inf, inf, inf, inf, inf, ...]', 'Coins = [1, 2, 5]'],
        explanation: '0 coins are needed to form amount 0.',
      },
      {
        step: 2,
        title: 'Transition for coin 1',
        stateVisual: ['dp[1] = dp[0]+1 = 1', 'dp[2] = dp[1]+1 = 2', 'dp[3] = 3'],
        explanation: 'Every amount i takes dp[i-1] + 1 coin of denomination 1.',
      },
      {
        step: 3,
        title: 'Transition for coin 2 & 5',
        stateVisual: ['dp[2] = min(2, dp[0]+1) = 1!', 'dp[5] = min(5, dp[0]+1) = 1!'],
        explanation: 'Greedy choice fails, but DP verifies all coin options systematically.',
      },
    ],
  },
  {
    id: 'greedy',
    name: 'Greedy Algorithms',
    category: 'Optimization Paradigms',
    tagline: 'Locally optimal choices proving global optimality',
    iconName: 'Zap',
    summary:
      'Greedy algorithms build up a solution piece by piece, always choosing the next piece that offers the most immediate benefit. Works when the problem exhibits the Greedy Choice Property and Optimal Substructure.',
    timeComplexity: {
      best: 'O(N log N) sorting + O(N) scan',
      average: 'O(N log N)',
      worst: 'O(N log N)',
    },
    spaceComplexity: 'O(1) to O(N) sorting',
    invariants: [
      'Interval Scheduling: Always sort intervals by ending time; pick the interval that finishes earliest to leave max time.',
      'Jump Game: Keep track of max reachable index; if current index > maxReach, goal is unreachable.',
      'Gas Station: If totalGas < totalCost, circuit impossible. Otherwise, starting index is first station after negative prefix sum.',
    ],
    canonicalProblems: [
      {
        title: 'Non-overlapping Intervals',
        difficulty: 'Medium',
        platform: 'LeetCode',
        idOrNumber: '435',
        url: 'https://leetcode.com/problems/non-overlapping-intervals/',
        coreIdea: 'Sort by end time. Greedily select non-overlapping intervals with earliest end times.',
      },
      {
        title: 'Gas Station',
        difficulty: 'Medium',
        platform: 'LeetCode',
        idOrNumber: '134',
        url: 'https://leetcode.com/problems/gas-station/',
        coreIdea: 'Linear scan accumulating net gas. Reset start position whenever running tank drops below 0.',
      },
    ],
    interactiveSteps: [
      {
        step: 1,
        title: 'Sort intervals by end time',
        stateVisual: ['[1, 2]', '[2, 3]', '[1, 3]', '[3, 4]'],
        explanation: 'Earliest deadline first leaves the maximum room for subsequent events.',
      },
      {
        step: 2,
        title: 'Select [1, 2], remove conflicting [1, 3]',
        stateVisual: ['Accepted: [1, 2]', 'Dropped: [1, 3] (starts at 1 < end 2)', 'Next available: [2, 3]'],
        explanation: 'Greedy step minimizes number of removals.',
      },
    ],
  },
  {
    id: 'backtracking',
    name: 'Backtracking & Combinatorics',
    category: 'Exhaustive Search',
    tagline: 'DFS decision tree exploration, pruning, and constraint satisfaction',
    iconName: 'Compass',
    summary:
      'Backtracking systematically searches all configurations in a combinatorial state space tree. It abandons a candidate ("backtracks") as soon as it determines that candidate cannot possibly lead to a valid solution.',
    timeComplexity: {
      best: 'O(N!) permutations or O(2^N) subsets',
      average: 'Pruned significantly below upper bound',
      worst: 'O(N * 2^N)',
    },
    spaceComplexity: 'O(N) recursion stack depth',
    invariants: [
      'Choose -> Explore -> Unchoose: Always undo state modifications (e.g. list.pop_back()) before returning to parent call.',
      'Pruning / Branch & Bound: Stop recursing immediately when constraints are violated (e.g. running sum > target).',
      'Permutations with Duplicates: Sort first; skip duplicate choice if nums[i] == nums[i-1] && !visited[i-1].',
    ],
    canonicalProblems: [
      {
        title: 'N-Queens',
        difficulty: 'Hard',
        platform: 'LeetCode',
        idOrNumber: '51',
        url: 'https://leetcode.com/problems/n-queens/',
        coreIdea: 'Bitmask or boolean sets for columns, positive diagonals (r + c), and negative diagonals (r - c).',
      },
      {
        title: 'Subsets & Combination Sum',
        difficulty: 'Medium',
        platform: 'LeetCode',
        idOrNumber: '39',
        url: 'https://leetcode.com/problems/combination-sum/',
        coreIdea: 'Sort candidates, iterate choices with start index, prune when candidate > remaining target.',
      },
    ],
    interactiveSteps: [
      {
        step: 1,
        title: 'Place Queen at Row 0, Col 0',
        stateVisual: ['[Q, ., ., .]', '[., ., ., .]', '[., ., ., .]', '[., ., ., .]'],
        explanation: 'Col 0, diag1 (0), diag2 (0) are now locked.',
      },
      {
        step: 2,
        title: 'Row 1 inspects valid columns',
        stateVisual: ['Col 0 attacked', 'Col 1 attacked diagonally', 'Place at Col 2!'],
        explanation: 'Valid placement found, recurse to Row 2.',
      },
    ],
  },
  {
    id: 'searching-binary-search',
    name: 'Searching & Binary Search Invariants',
    category: 'Algorithmic Primitives',
    tagline: 'Logarithmic search space reduction over monotonic answer spaces',
    iconName: 'Search',
    summary:
      'Binary Search reduces an ordered search space by half at each step. While trivial on sorted arrays, its true power lies in "Binary Search on Answer" (e.g. Koko Eating Bananas, Capacity To Ship Packages).',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log N)',
      worst: 'O(log N)',
    },
    spaceComplexity: 'O(1) iterative space',
    invariants: [
      'Overflow Avoidance: Use mid = left + (right - left) / 2 instead of (left + right) / 2.',
      'Loop Invariant: In left <= right, search interval is [left, right].',
      'Binary Search on Answer: Identify monotonic feasibility function f(speed) -> true/false, then find transition boundary.',
    ],
    canonicalProblems: [
      {
        title: 'Search in Rotated Sorted Array',
        difficulty: 'Medium',
        platform: 'LeetCode',
        idOrNumber: '33',
        url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
        coreIdea: 'One half is always strictly sorted. Determine which half is sorted, then check if target falls inside it.',
      },
      {
        title: 'Koko Eating Bananas',
        difficulty: 'Medium',
        platform: 'LeetCode',
        idOrNumber: '875',
        url: 'https://leetcode.com/problems/koko-eating-bananas/',
        coreIdea: 'Binary search speed k between [1, max(piles)]. Feasibility check computes hours in O(N).',
      },
    ],
    interactiveSteps: [
      {
        step: 1,
        title: 'Initial boundaries [low=1, high=11]',
        stateVisual: ['low=1', 'high=11', 'mid=(1+11)/2 = 6'],
        explanation: 'Check if Koko can finish all bananas in H hours at speed 6.',
      },
      {
        step: 2,
        title: 'Speed 6 works! Try smaller speed',
        stateVisual: ['canFinish(6) == true', 'high = mid = 6', 'Search range: [1, 6]'],
        explanation: 'Invariant: minimal speed is in left half.',
      },
    ],
  },
  {
    id: 'sorting-quickselect',
    name: 'Sorting & QuickSelect',
    category: 'Algorithmic Primitives',
    tagline: 'Divide-and-conquer, QuickSort partitioning, and O(N) K-th element',
    iconName: 'Sliders',
    summary:
      'Sorting arranges data in a defined order. MergeSort guarantees O(N log N) stable sorting, QuickSort provides cache-friendly in-place sorting, and QuickSelect finds the K-th smallest/largest element in average linear O(N) time.',
    timeComplexity: {
      best: 'O(N log N)',
      average: 'O(N log N) for sort, O(N) for select',
      worst: 'O(N²) QuickSort without random pivot',
    },
    spaceComplexity: 'O(log N) recursion or O(N) auxiliary for MergeSort',
    invariants: [
      'Partition Invariant: After Lomuto/Hoare partition, pivot element is in its exact final sorted position.',
      'Elements left of pivot <= pivot; elements right of pivot >= pivot.',
      'QuickSelect: Only recurse into the single partition branch containing index K, achieving O(N + N/2 + N/4 ...) = O(2N) = O(N).',
    ],
    canonicalProblems: [
      {
        title: 'Kth Largest Element in an Array',
        difficulty: 'Medium',
        platform: 'LeetCode',
        idOrNumber: '215',
        url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
        coreIdea: 'QuickSelect partitioning with randomized pivot or min-heap of size K.',
      },
      {
        title: 'Merge Intervals',
        difficulty: 'Medium',
        platform: 'LeetCode',
        idOrNumber: '56',
        url: 'https://leetcode.com/problems/merge-intervals/',
        coreIdea: 'Sort by interval start time, then merge overlapping boundaries in single linear scan.',
      },
    ],
    interactiveSteps: [
      {
        step: 1,
        title: 'Choose random pivot (e.g. value 5)',
        stateVisual: ['Array: [3, 2, 1, 5, 6, 4]', 'Pivot: 5'],
        explanation: 'Partition items around pivot 5.',
      },
      {
        step: 2,
        title: 'Partition completed',
        stateVisual: ['Left (<5): [3, 2, 1, 4]', 'Pivot: [5] at index 4', 'Right (>5): [6]'],
        explanation: 'Since index 4 == target index, 5 is the exact answer without sorting the rest!',
      },
    ],
  },
];
