---
title: "JavaScript 코딩테스트 자료구조 & 알고리즘"
date: "2025-10-28"
modified: "2025-10-28"
category: "기술"
tags: ["Javascript", "알고리즘", "코딩테스트"]
excerpt: "Javascript언어 알고리즘 구현 템플릿 코드를 공유합니다."
---

# JavaScript 코딩테스트 자료구조 & 알고리즘 완벽 가이드

## 목차

1. [선형 자료구조](#1-선형-자료구조)
   - 링크드 리스트
   - 더블 링크드 리스트
   - 스택
   - 큐
   - 덱
2. [트리 기반 자료구조](#2-트리-기반-자료구조)
   - 우선순위 큐 (힙)
3. [그래프](#3-그래프)
4. [탐색 알고리즘](#4-탐색-알고리즘)
   - DFS (깊이 우선 탐색)
   - BFS (너비 우선 탐색)

---

## 1. 선형 자료구조

### 1-1. 링크드 리스트 (단방향)

링크드 리스트는 노드가 연결된 선형 자료구조로, 동적 메모리 할당과 효율적인 삽입/삭제가 가능합니다.

```javascript
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // 맨 앞에 추가
  addFirst(val) {
    const node = new ListNode(val);
    node.next = this.head;
    this.head = node;
    this.size++;
  }

  // 맨 뒤에 추가
  addLast(val) {
    const node = new ListNode(val);
    if (!this.head) {
      this.head = node;
    } else {
      let curr = this.head;
      while (curr.next) curr = curr.next;
      curr.next = node;
    }
    this.size++;
  }

  // 삭제
  remove(val) {
    if (!this.head) return false;
    if (this.head.val === val) {
      this.head = this.head.next;
      this.size--;
      return true;
    }
    let curr = this.head;
    while (curr.next && curr.next.val !== val) {
      curr = curr.next;
    }
    if (curr.next) {
      curr.next = curr.next.next;
      this.size--;
      return true;
    }
    return false;
  }

  toArray() {
    const arr = [];
    let curr = this.head;
    while (curr) {
      arr.push(curr.val);
      curr = curr.next;
    }
    return arr;
  }
}
```

**사용 예시:**

```javascript
const list = new LinkedList();
list.addLast(1);
list.addLast(2);
list.addFirst(0);
console.log(list.toArray()); // [0, 1, 2]
```

---

### 1-2. 더블 링크드 리스트 (양방향)

양방향 연결로 앞뒤 모두에서 O(1) 시간에 삽입/삭제가 가능합니다.

```javascript
class DListNode {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // 맨 앞에 추가 O(1)
  addFirst(val) {
    const node = new DListNode(val);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.size++;
  }

  // 맨 뒤에 추가 O(1)
  addLast(val) {
    const node = new DListNode(val);
    if (!this.tail) {
      this.head = this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }

  // 맨 앞 삭제 O(1)
  removeFirst() {
    if (!this.head) return null;
    const val = this.head.val;
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
    this.size--;
    return val;
  }

  // 맨 뒤 삭제 O(1)
  removeLast() {
    if (!this.tail) return null;
    const val = this.tail.val;
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    this.size--;
    return val;
  }
}
```

**사용 예시:**

```javascript
const dlist = new DoublyLinkedList();
dlist.addLast(1);
dlist.addLast(2);
dlist.addFirst(0);
console.log(dlist.removeFirst()); // 0
console.log(dlist.removeLast()); // 2
```

---

### 1-3. 스택 (LIFO)

Last In First Out 구조로, 후입선출 방식의 자료구조입니다.

```javascript
class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}
```

**사용 예시:**

```javascript
const stack = new Stack();
stack.push(1);
stack.push(2);
console.log(stack.pop()); // 2
console.log(stack.peek()); // 1
```

---

### 1-4. 큐 (FIFO)

First In First Out 구조로, 선입선출 방식의 자료구조입니다.

```javascript
class Queue {
  constructor() {
    this.items = [];
    this.front = 0;
  }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    if (this.isEmpty()) return null;
    return this.items[this.front++];
  }

  peek() {
    return this.items[this.front];
  }

  isEmpty() {
    return this.front >= this.items.length;
  }

  size() {
    return this.items.length - this.front;
  }
}
```

**사용 예시:**

```javascript
const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue()); // 1
console.log(queue.peek()); // 2
```

---

### 1-5. 덱 (Deque - 양쪽 삽입/삭제)

양쪽 끝에서 삽입과 삭제가 모두 가능한 자료구조입니다.

```javascript
class Deque {
  constructor() {
    this.items = [];
  }

  addFront(item) {
    this.items.unshift(item);
  }

  addRear(item) {
    this.items.push(item);
  }

  removeFront() {
    return this.items.shift();
  }

  removeRear() {
    return this.items.pop();
  }

  peekFront() {
    return this.items[0];
  }

  peekRear() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}
```

**사용 예시:**

```javascript
const deque = new Deque();
deque.addRear(1);
deque.addFront(0);
deque.addRear(2);
console.log(deque.removeFront()); // 0
console.log(deque.removeRear()); // 2
```

---

## 2. 트리 기반 자료구조

### 2-1. 우선순위 큐 (힙)

힙 기반의 우선순위 큐로, 최소값 또는 최대값을 빠르게 추출할 수 있습니다.

```javascript
class PriorityQueue {
  constructor(compare = (a, b) => a - b) {
    this.heap = [];
    this.compare = compare; // 비교 함수: 음수면 a가 우선순위 높음
  }

  push(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.isEmpty()) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return top;
  }

  peek() {
    return this.heap[0];
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }

  bubbleUp(idx) {
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (this.compare(this.heap[idx], this.heap[parent]) < 0) {
        [this.heap[idx], this.heap[parent]] = [this.heap[parent], this.heap[idx]];
        idx = parent;
      } else {
        break;
      }
    }
  }

  bubbleDown(idx) {
    while (true) {
      let smallest = idx;
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;

      if (left < this.heap.length && this.compare(this.heap[left], this.heap[smallest]) < 0) {
        smallest = left;
      }
      if (right < this.heap.length && this.compare(this.heap[right], this.heap[smallest]) < 0) {
        smallest = right;
      }

      if (smallest !== idx) {
        [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
        idx = smallest;
      } else {
        break;
      }
    }
  }
}
```

**사용 예시:**

```javascript
// 최소 힙
const minPQ = new PriorityQueue();
minPQ.push(5);
minPQ.push(2);
minPQ.push(8);
console.log(minPQ.pop()); // 2

// 최대 힙
const maxPQ = new PriorityQueue((a, b) => b - a);
maxPQ.push(5);
maxPQ.push(2);
maxPQ.push(8);
console.log(maxPQ.pop()); // 8

// 객체 정렬 (거리 기준)
const distPQ = new PriorityQueue((a, b) => a.dist - b.dist);
distPQ.push({ node: "A", dist: 10 });
distPQ.push({ node: "B", dist: 5 });
console.log(distPQ.pop()); // { node: 'B', dist: 5 }
```

---

## 3. 그래프

### 3-1. 그래프 (인접 리스트)

가중치를 가진 방향/무방향 그래프를 인접 리스트로 구현합니다.

```javascript
class Graph {
  constructor(directed = false) {
    this.adj = new Map();
    this.directed = directed;
  }

  addVertex(v) {
    if (!this.adj.has(v)) {
      this.adj.set(v, []);
    }
  }

  // 가중치 있는 간선 추가
  addEdge(u, v, weight = 1) {
    this.addVertex(u);
    this.addVertex(v);
    this.adj.get(u).push({ node: v, weight });
    if (!this.directed) {
      this.adj.get(v).push({ node: u, weight });
    }
  }

  getNeighbors(v) {
    return this.adj.get(v) || [];
  }

  getVertices() {
    return Array.from(this.adj.keys());
  }
}
```

**사용 예시:**

```javascript
// 무방향 그래프 (기본)
const graph = new Graph();
graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "C", 1);

// 방향 그래프
const directedGraph = new Graph(true);
directedGraph.addEdge("A", "B", 5);
```

---

## 4. 탐색 알고리즘

### 4-1. DFS (깊이 우선 탐색)

#### DFS - 재귀 (그래프)

```javascript
function dfsRecursive(graph, start, visited = new Set()) {
  visited.add(start);
  console.log(start); // 방문 처리

  for (const { node } of graph.getNeighbors(start)) {
    if (!visited.has(node)) {
      dfsRecursive(graph, node, visited);
    }
  }

  return visited;
}
```

#### DFS - 반복 (그래프)

```javascript
function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];

  while (stack.length > 0) {
    const node = stack.pop();

    if (visited.has(node)) continue;
    visited.add(node);
    console.log(node); // 방문 처리

    for (const { node: neighbor } of graph.getNeighbors(node)) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }

  return visited;
}
```

#### DFS - 2D 배열 (4방향)

```javascript
function dfs2D(grid, row, col, visited = null) {
  const rows = grid.length;
  const cols = grid[0].length;

  if (!visited) {
    visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  }

  if (row < 0 || row >= rows || col < 0 || col >= cols || visited[row][col] || grid[row][col] === 0) {
    return;
  }

  visited[row][col] = true;
  console.log(`Visited: (${row}, ${col})`);

  // 상하좌우 탐색
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  for (const [dr, dc] of directions) {
    dfs2D(grid, row + dr, col + dc, visited);
  }

  return visited;
}
```

**사용 예시:**

```javascript
const graph = new Graph();
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");

dfsRecursive(graph, "A"); // A -> B -> D -> C
dfsIterative(graph, "A");

const grid = [
  [1, 1, 0],
  [1, 0, 1],
  [0, 1, 1],
];
dfs2D(grid, 0, 0); // (0,0) -> (0,1) -> (1,0)
```

---

### 4-2. BFS (너비 우선 탐색)

#### BFS - 그래프

```javascript
function bfsGraph(graph, start) {
  const visited = new Set();
  const queue = [start];
  visited.add(start);

  while (queue.length > 0) {
    const node = queue.shift();
    console.log(node); // 방문 처리

    for (const { node: neighbor } of graph.getNeighbors(node)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return visited;
}
```

#### BFS - 2D 배열 (4방향)

```javascript
function bfs2D(grid, startRow, startCol) {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const queue = [[startRow, startCol]];
  visited[startRow][startCol] = true;

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  while (queue.length > 0) {
    const [row, col] = queue.shift();
    console.log(`Visited: (${row}, ${col})`);

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && !visited[newRow][newCol] && grid[newRow][newCol] === 1) {
        visited[newRow][newCol] = true;
        queue.push([newRow, newCol]);
      }
    }
  }

  return visited;
}
```

**사용 예시:**

```javascript
const graph = new Graph();
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");

bfsGraph(graph, "A"); // A -> B -> C -> D

const grid = [
  [1, 1, 0],
  [1, 0, 1],
  [0, 1, 1],
];
bfs2D(grid, 0, 0); // (0,0) -> (0,1) -> (1,0)
```

---

## 성능 분석

### 시간 복잡도 요약

| 자료구조             | 삽입     | 삭제     | 탐색     |
| -------------------- | -------- | -------- | -------- |
| 링크드 리스트        | O(1)\*   | O(n)     | O(n)     |
| 더블 링크드 리스트   | O(1)     | O(1)\*   | O(n)     |
| 스택                 | O(1)     | O(1)     | O(n)     |
| 큐                   | O(1)     | O(1)     | O(n)     |
| 덱                   | O(1)     | O(1)     | O(n)     |
| 우선순위 큐          | O(log n) | O(log n) | O(1)\*\* |
| 그래프 (인접 리스트) | O(1)     | O(V)     | O(V+E)   |

\* 해당 위치를 알고 있을 때  
\*\* peek 연산

---

## 알고리즘 패턴 가이드

### 주요 패턴별 활용

| 패턴                   | 핵심 개념                | 대표 문제 유형                                     |
| ---------------------- | ------------------------ | -------------------------------------------------- |
| **슬라이딩 윈도우**    | 고정/가변 크기 구간 이동 | 최장 부분 문자열, 최대 합 부분 배열, 애너그램      |
| **투 포인터**          | 양 끝에서 접근           | 2Sum, 모음 뒤집기, 정렬된 제곱, 회문 검사          |
| **빠른 & 느린 포인터** | 다른 속도로 순회         | 연결 리스트 순환, 행복한 수                        |
| **이진 탐색**          | 정렬된 데이터 분할 탐색  | 회전 배열, 첫/마지막 위치 찾기                     |
| **DFS / BFS**          | 깊이/너비 우선 탐색      | 그래프 순회, 플러드 필, 단어 사다리, 최단 경로     |
| **백트래킹**           | 모든 경우의 수 탐색      | 스도쿠, N-퀸, 단어 찾기, 순열                      |
| **동적 프로그래밍**    | 중복 계산 방지           | 배낭 문제, 집 도둑, 최장 증가 부분 수열, 편집 거리 |
| **그리디**             | 매 순간 최적해 선택      | 활동 선택, 점프 게임, 주유소                       |
| **유니온-파인드**      | 집합 연산                | 지역 개수, 크루스칼 MST, 연결 요소                 |
| **위상 정렬**          | 선후 관계 정렬           | 강의 일정, 작업 스케줄링                           |
| **누적 합**            | 구간 합 최적화           | 범위 합, 합이 K인 부분 배열                        |
| **단조 스택/큐**       | 증가/감소 순서 유지      | 다음 큰 원소, 일일 온도, 최대 직사각형             |
| **비트 조작**          | 비트 연산 활용           | 단일 숫자, 비트 세기, 부분 집합, XOR 문제          |
| **트라이**             | 접두사 트리              | 단어 검색, 접두사 시작, 단어 교체                  |
| **힙/우선순위 큐**     | 최대/최소값 빠른 접근    | K번째 최대값, 상위 K개 원소, K개 리스트 병합       |
| **재귀**               | 자기 자신 호출           | 트리 문제, 팩토리얼, 부분 집합, 병합 정렬          |
| **세그먼트 트리**      | 구간 쿼리 최적화         | 범위 합/최소/최대, 배열 업데이트                   |
| **행렬 순회**          | 2D 배열 탐색             | 나선형 순서, 섬 개수, 대각선 순회                  |
| **해싱**               | O(1) 조회                | 2Sum, 애너그램 그룹화, 빈도수 계산                 |

### 자주 쓰이는 문제 패턴

- **최단 거리**: BFS + 큐
- **다익스트라**: 우선순위 큐 + 그래프
- **위상 정렬**: DFS 또는 BFS
- **섬 개수**: DFS/BFS + 2D 배열
- **괄호 검증**: 스택
- **슬라이딩 윈도우**: 덱

---

## 마치며

이 가이드는 JavaScript로 코딩 테스트를 준비하는 개발자들을 위한 핵심 자료구조와 알고리즘 템플릿을 담고 있습니다. 각 자료구조의 시간 복잡도를 이해하고, 문제 유형에 맞는 적절한 패턴을 선택하는 것이 중요합니다.

실전에서는 이러한 기본 구현을 기반으로 문제의 요구사항에 맞게 변형하여 사용하게 됩니다. 꾸준한 연습을 통해 각 자료구조와 알고리즘의 특성을 체득하시기 바랍니다.
