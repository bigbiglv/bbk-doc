# `git stash`
* 可以对工作区代码（未`add`）修改的临时保存

## 场景
在正常代码开发中出现紧急修改，可能时本分支也可能需要切换其他分支，但此时的开发还没完成不想 `commit` 代码，
此时就能执行 `git stash` 将这部分代码保存起来，保存后可以正常切分支，正常修改提交代码，等处理完后再执行
`git stash pop` 恢复保存的代码。

## 命令
* `git stash`: 保存工作区内容，按列表保存每次执行都是往列表后插入一条保存记录
* `git stash save -u`: 保存添加新建的文件
* `git stash list`: 显示当前保存的内容列表
* `git stash save 'msg'`: 保存时添加保存信息
* `git stash pop`: 恢复列表最后一条记录并删除
* `git stash apply`: 恢复但不删除，可通过保存信息指定恢复列表中哪一条内容
* `git stash drop <修改名>`: 删除指定`stash`保存的内容
