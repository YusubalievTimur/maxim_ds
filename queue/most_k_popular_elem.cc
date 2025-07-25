#include <iostream>
#include <vector>
#include <unordered_map>
#include <queue>
#include <sstream>
#include <cstdlib>

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
    std::cout << "---------\n";
    for (int i : vec) {
        std::cout << i << " ";
    }
    std::cout << "\n---------\n";
}

int main(int argc, char* argv[]) {
    if (argc < 3) {
        std::cerr << "Использование: " << argv[0] << " <k> <элемент1> <элемент2> ...\n";
        return 1;
    }

    int k = std::atoi(argv[1]);
    std::vector<int> arr;
    
    for (int i = 2; i < argc; ++i) {
        arr.push_back(std::atoi(argv[i]));
    }

    Print(Solution(arr, k));
    return 0;
}
