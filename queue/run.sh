#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

CPP_FILE="${SCRIPT_DIR}/most_k_popular_elem.cc"
OUTPUT_FILE="${SCRIPT_DIR}/solution"

error() {
    echo "ОШИБКА: $1" >&2
}

if [ ! -f "$CPP_FILE" ]; then
    error "Файл $CPP_FILE не найден в директории $SCRIPT_DIR"
    exit 1
fi

if [ "$#" -lt 2 ]; then
    error "Использование: $0 <k> <элемент1> <элемент2> ..."
    exit 1
fi

if ! g++ -std=c++14 "$CPP_FILE" -o "$OUTPUT_FILE" 2>&1; then
    exit 1
fi

echo "Компиляция успешно завершена" >&2

k=$1
shift
arr=("$@")

"$OUTPUT_FILE" "$k" "${arr[@]}"
