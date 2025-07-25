#include <iostream>
#include <vector>
#include <unordered_map>
#include <queue>

std::vector<int> Solution(const std::vector<int>& arr, const int k) {
    struct Compare{
        bool operator()(const std::pair<int, std::size_t>& lhs, const std::pair<int, std::size_t>& rhs) {
            return lhs.second < rhs.second;
        }
    };
    std::unordered_map<int, std::size_t> freq;
    for (const auto& value: arr) 
        ++freq[value];
    
    std::priority_queue<std::pair<int, std::size_t>, std::vector<std::pair<int, std::size_t>>, Compare> que(
        freq.begin(), freq.end());

    std::vector<int> ans;
    ans.reserve(k);
    for (int i = 0; i < k; ++i) {
        ans.push_back(que.top().first);
        que.pop();
    }

    return ans;
}

void Print(const std::vector<int>& vec) {
    std::cout <<"---------\n";
    for (int i : vec) {
        std::cout << i << " ";
    }
    std::cout <<"\n---------\n";
}

int main() {
    std::vector<int> s1 {1, 1, 1, 2, 3, 4, 4};
    int k1 = 2;

    Print(Solution(s1, k1));
    return 0;
}
