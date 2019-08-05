//========= 按人查询代码统计

git log --format='%aN' | sort -u | while read name; do echo -en "$name\t"; git log --author="$name" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -; done

// ========== 某个人代码提交统计

git log --author="babuge" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 -$2 } END { printf "added lines: %s, removed lines: %s; total lines: %s\n", add, subs, loc}'

// ========== 所有人代码提交统计

git log --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 -$2 } END { printf "added lines: %s, removed lines: %s; total lines: %s\n", add, subs, loc}'


// ========== 所有人某段时间代码提交统计

git log --author="" --pretty=tformat: --since ==2018-01-05 --until ==2019-06-01 --numstat | awk '{ add += $1; subs += $2; loc += $1 -$2 } END { printf "added lines: %s, removed lines: %s; total lines: %s\n", add, subs, loc}'


// ========== 按人获取某段时间代码提交统计

git log --format='%aN' | sort -u | while read name; do echo -en "$name\t"; git log --author="$name" --pretty=tformat: --since==2019-06-01 --until==2019-06-05 --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -; done
