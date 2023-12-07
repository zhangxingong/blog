+++
title = "吴恩达与OpenAI最新课程：开发者必备的prompt-engineering精读笔记"
date = "2023-12-07T17:26:59+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

#### 文章目录

+   +   [一、前言](#_3)
    +   [二、Prompt编写原则](#Prompt_21)
    +   +   [2.1 环境配置](#21__25)
        +   [2.2 编写清晰、具体的指令](#22__96)
        +   +   [2.2.1 使用分隔符](#221__104)
            +   [2.2.2 结构化输出（JSON、HTML等）](#222_JSONHTML_135)
            +   [2.2.3 要求模型检查条件是否满足](#223__175)
            +   [2.2.4 提供少量示例（Few-shot Prompting）](#224_Fewshot_Prompting_241)
        +   [2.3 指导模型思考](#23__264)
        +   +   [2.3.1 指定任务步骤](#231__269)
            +   [2.3.2 要求模型事先自行计算](#232__348)
        +   [2.4局限性](#24_434)
    +   [三、指令迭代](#_472)
    +   +   [3.1 环境配置](#31__492)
        +   [3.2 从产品说明书生成一份营销描述](#32__529)
        +   +   [3.2.1 迭代一：限制生成文本长度](#321__603)
            +   [3.2.2 迭代二：关注正确的细节](#322__639)
            +   [3.2.3 迭代三：表格式描述](#323__715)
        +   [3.3 总结](#33__784)
    +   [四、摘要（Summarizing）](#Summarizing_789)
    +   +   [4.1 引言](#41__792)
        +   [4.2 单文本概括](#42__815)
        +   +   [4.2.1 限制输出文本长度](#421__829)
            +   [4.2.2 侧重特定群体/角度](#422__868)
            +   [4.2.3 信息提取](#423__909)
        +   [4.3 多文本概括prompt](#43_prompt_930)
    +   [五、推理（inferring）](#inferring_1036)
    +   +   [5.1 引言](#51__1037)
        +   [5.2 情感识别](#52__1069)
        +   [5.3 信息抽取](#53__1151)
        +   [5.4 多任务处理](#54__1186)
        +   [5.5 主题推断](#55__1220)
    +   [六、机器转译（transforming）](#transforming_1314)
    +   +   [6.1引言](#61_1315)
        +   [6.2 机器翻译](#62__1338)
        +   [6.3 语气/风格调整](#63__1449)
        +   [6.4 格式转换](#64__1487)
        +   [6.5 拼写检查、语法纠正](#65__1566)
        +   [6.6 综合样例：文本翻译+拼写纠正+风格调整+格式转换](#66__1660)
    +   [七、文本扩展（Expanding）](#Expanding_1705)
    +   +   [7.1 前言](#71__1706)
        +   [7.2 定制客户邮件](#72__1759)
        +   [7.3 使用温度系数](#73__1823)
    +   [八、 聊天机器人](#__1866)
    +   +   [8.1 前言](#81__1867)
        +   [8.2 聊天机器人](#82__1923)
        +   [8.3 点餐机器人（orderbot）](#83_orderbot_1983)
    +   [九、总结](#_2121)

> 参考：[bilibili视频（中文字幕）](https://www.bilibili.com/video/BV1Bo4y1A7FU/?spm_id_from=333.788&vd_source=2ea10d49ee2bec24203cd6deb18533d4)、[github项目（含笔记）](https://github.com/datawhalechina/prompt-engineering-for-developers)

### 一、前言

目前大型语言模型（`LLM`）大致可以分为两种类型：

+   `Based LLM`：基础LLM。使用互联网上或其它来源的大量文本数据进行训练，训练方式是预测句子的下一个词。
+   `Instruction Tuned LLM`：指令微调过的LLM，被训练后会遵循指令给出答案。

  因此，如果你问`Based LLM`“法国的首都是什么？”，它可能会根据互联网上的文章，将答案预测为“法国最大的城市是什么？法国的人口是多少？”，因为互联网上的文章很可能是有关法国国家的问答题目列表。而如果你对`Instruction Tuned LLM`问同样的问题，它更有可能输出“法国的首都是巴黎”。

  `Instruction Tuned LLM`的训练通常是从已经训练好的基本 LLMs 开始，该模型已经在大量文本数据上进行了训练。然后，使用人工标注的`prompt-answer`数据集来对其进行有监督微调，要求它遵循这些指令。最后通常使用一种称为 RLHF（reinforcement learning from human feedback，人类反馈强化学习）的技术进行进一步改进，使系统更能够有帮助地遵循指令（具体原理可参考[《李沐论文精度系列之九：InstructGPT》](https://blog.csdn.net/qq_56591814/article/details/130588064?spm=1001.2014.3001.5501)）。

  `Instruction Tuned LLM`经过训练，比`Based LLM`更具有帮助性、真实性和无害性（安全性）。因此如今的许多实际使用场景已经转向`Instruction Tuned LLM`。

  本课程由吴恩达和OpenAI 的技术团队成员 `Isa Fulford` 教授一起授课。在本课程中，我们将与您**分享一些LLM的可能性以及实现它们的最佳实践，希望这能激发你创建新应用的想象力（LLM 或大型语言模型作为开发人员的更强大功能是使用 API 调用到 LLM，以快速构建软件应用程序。）**。本课程包括：

+   软件开发prompt的最佳实践
+   常见用例、总结、推断、转化。扩展
+   使用LLM帮助创建一个聊天机器人

![在这里插入图片描述](https://img-blog.csdnimg.cn/82b51fd5c7634f898000b4e650142be5.png#pic_center)

### 二、Prompt编写原则

  创建prompt的一个重要原则是**指令清晰**，另一个是要**给模型思考的时间**。

#### 2.1 环境配置

  本教程使用 OpenAI 所开放的 ChatGPT API，因此你需要首先拥有一个 ChatGPT 的 `API_KEY`（在OpenAI登录后的personal页面下），然后需要安装 openai 的第三方库：

```bash
pip install openai     		   # 安装openai
pip install -U python-dotenv  # 安装python-dotenv

# 将自己的 API-KEY 导入系统环境变量
!export OPENAI_API_KEY='api-key'
```

然后倒入相关的库：

```python
import openai
import os
from dotenv import load_dotenv, find_dotenv
# 导入第三方库

_ = load_dotenv(find_dotenv())
# 读取系统中的环境变量
openai.api_key  = os.getenv('OPENAI_API_KEY')
# 设置 API_KEY
```

  我们将在8.1节中深入探究 OpenAI 提供的 ChatCompletion API 的使用方法，在此处，我们先将它封装成一个函数，你无需知道其内部机理，仅需知道调用该函数输入 Prompt 其将会给出对应的 Completion 即可。本课程中，我们使用的是`gpt-3.5-turbo`。

```python
# 一个封装 OpenAI 接口的函数，参数为 Prompt，返回对应结果
# 接受提示，返回提示补全内容
def get_completion(prompt, model="gpt-3.5-turbo"):
    '''
    prompt: 对应的提示
    model: 调用的模型，默认为 gpt-3.5-turbo(ChatGPT)，有内测资格的用户可以选择 gpt-4
    '''
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0, # 模型输出的温度系数，控制输出的随机程度
    )
    # 调用 OpenAI 的 ChatCompletion 接口
    return response.choices[0].message["content"]

```

也可以参考ChatGPT进阶课程[《datawhalechina/HuggingLLM》](https://github.com/datawhalechina/hugging-llm/blob/main/content/ChatGPT%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97%E2%80%94%E2%80%94%E5%8F%A5%E8%AF%8D%E5%88%86%E7%B1%BB.ipynb)中，调用API的方式：

```python
import openai
OPENAI_API_KEY = "填入专属的API key"

openai.api_key = OPENAI_API_KEY

def complete(prompt):
    response = openai.Completion.create(
      model="text-davinci-003",
      prompt=prompt,
      temperature=0,
      max_tokens=64,
      top_p=1.0,
      frequency_penalty=0.0,
      presence_penalty=0.0
    )
    ans = response.choices[0].text
    return ans
```

#### 2.2 编写清晰、具体的指令

  你应该通过提供尽可能清晰和具体的指令来表达您希望模型执行的操作，这将引导模型给出正确的输出，并减少你得到无关或不正确响应的可能。编写清晰的指令不意味着简短的指令，因为在许多情况下，**更长的提示实际上更清晰且提供了更多上下文**，最终得到更详细更相关的输出。

  编写具体清晰的指令有以下四种策略（tactic），接下来一一介绍：  
![在这里插入图片描述](https://img-blog.csdnimg.cn/8d0718cedaea402db23f759665822359.png#pic_center)

##### 2.2.1 使用分隔符

  策略一是使用分隔符，分隔符可清晰地表示输入的不同部分，分隔符可以是：`/```,"""，---，<>，<tag>，<\tag>`等:

  你可以使用任何明显的标点符号将特定的文本部分与提示的其余部分分开，避免提示注入。以下是一个例子，我们给出一段话并要求 GPT 进行总结，在该示例中我们使用 \`\`\`来作为分隔符。

> 提示注入：输入里面包含其他指令，会覆盖掉你的指令。对此，使用分隔符是一个不错的策略。  
> 本文prompt中使用了`\`进行换行，只是为了方便展示，实际调用API中，并不需要`\`符号。

```python
# 原例子是英文的，这里做了翻译，下同。
text = f"""
你应该提供尽可能清晰、具体的指示，以表达你希望模型执行的任务。\
这将引导模型朝向所需的输出，并降低收到无关或不正确响应的可能性。不要将写清晰的提示与写简短的提示混淆。\
在许多情况下，更长的提示可以为模型提供更多的清晰度和上下文信息，从而导致更详细和相关的输出。
"""
# 需要总结的文本内容
prompt = f"""
把用三个反引号括起来的文本总结成一句话。
```{text}```
"""
# 指令内容，使用 ```来分隔指令和待总结的内容
response = get_completion(prompt)
print(response)
```

```auto
提供清晰具体的指示，避免无关或不正确响应，不要混淆写清晰和写简短，更长的提示可以提供更多清晰度和上下文信息，导致更详细和相关的输出。
```

  而不使用分隔符，可能会输出错误的结果。比如下面的例子中，模型可能忘了最开始的总结提示，而遵循文本中的“写一首关于可爱熊猫的诗”。而有了分隔符之后，模型就知道是需要对\`\`\`包围的部分进行总结。  
![在这里插入图片描述](https://img-blog.csdnimg.cn/cac85e3416c7451396bf7b7517d89a1c.png#pic_center)

##### 2.2.2 结构化输出（JSON、HTML等）

  策略二是进行结构化输出，可以是 `JSON`、`HTML` 等格式，这可以使模型的输出更容易被我们解析。例如，你可以在 Python 中将其读入字典或列表中。。

  在以下示例中，我们要求 GPT 生成三本书的标题、作者和类别，并要求 GPT 以 `JSON` 的格式返回给我们，为便于解析，我们指定了 `JSON` 的键。这样做的好处是，在python中我们可以把它读成一个字典或者列表。

```python
prompt = f"""
请生成包括书名、作者和类别的三本虚构书籍清单，并以 JSON 格式提供，其中包含以下键:book_id、title、author、genre。
"""
response = get_completion(prompt)
print(response)

```

```auto
{
  "books": [
    {
      "book_id": 1,
      "title": "The Shadow of the Wind",
      "author": "Carlos Ruiz Zafón",
      "genre": "Mystery"
    },
    {
      "book_id": 2,
      "title": "The Name of the Wind",
      "author": "Patrick Rothfuss",
      "genre": "Fantasy"
    },
    {
      "book_id": 3,
      "title": "The Hitchhiker's Guide to the Galaxy",
      "author": "Douglas Adams",
      "genre": "Science Fiction"
    }
  ]
}
```

##### 2.2.3 要求模型检查条件是否满足

  如果任务做出的假设不一定满足，我们可以告诉模型先检查这些假设，如果不满足，指示并停止执行。你还可以考虑潜在的边缘情况以及模型应该如何处理它们，以避免意外的错误或结果。

  在下面的例子中，我们将分别给模型两段文本： 制作茶的步骤以及一段没有明确步骤的文本。我们将要求模型判断其是否包含一系列指令，如果包含则按照给定格式重新编写指令，不包含则回答未提供的步骤。

```python
# 有步骤的文本
text_1 = f"""
泡一杯茶很容易。首先，需要把水烧开。在等待期间，拿一个杯子并把茶包放进去。一旦水足够热，就把它倒在茶包上。\
等待一会儿，让茶叶浸泡。几分钟后，取出茶包。如果你愿意，可以加一些糖或牛奶调味。就这样，你可以享受一杯美味的茶了。
"""
prompt = f"""
您将获得由三个引号括起来的文本。如果它包含一系列的指令，则需要按照以下格式重新编写这些指令：

第一步 - ...
第二步 - …
…
第N步 - …

如果文本中不包含一系列的指令，则直接写“未提供步骤”。"
\"\"\"{text_1}\"\"\"
"""
response = get_completion(prompt)
print("Text 1 的总结:")
print(response)
```

```auto
Text 1 的总结:
第一步 - 把水烧开。
第二步 - 拿一个杯子并把茶包放进去。
第三步 - 把烧开的水倒在茶包上。
第四步 - 等待几分钟，让茶叶浸泡。
第五步 - 取出茶包。
第六步 - 如果你愿意，可以加一些糖或牛奶调味。
第七步 - 就这样，你可以享受一杯美味的茶了。
```

```python
# 无步骤的文本
text_2 = f"""
今天阳光明媚，鸟儿在歌唱。这是一个去公园散步的美好日子。鲜花盛开，树枝在微风中轻轻摇曳。
人们外出享受着这美好的天气，有些人在野餐，有些人在玩游戏或者在草地上放松。这是一个完美的日子，可以在户外度过并欣赏大自然的美景。
"""
prompt = f"""
您将获得由三个引号括起来的文本。如果它包含一系列的指令，则需要按照以下格式重新编写这些指令：

第一步 - ...
第二步 - …
…
第N步 - …

如果文本中不包含一系列的指令，则直接写“未提供步骤”。"
\"\"\"{text_2}\"\"\"
"""
response = get_completion(prompt)
print("Text 2 的总结:")
print(response)
```

```auto
Text 2 的总结:
未提供步骤。
```

##### 2.2.4 提供少量示例（Few-shot Prompting）

  `Few-shot Prompting`，即在要求模型执行实际任务之前，提供给它少量成功执行任务的示例。

  例如，在以下的示例中，我们告诉模型其任务是以一致的风格回答问题，并先给它一个孩子和一个祖父之间的对话的例子。例子中，grandparent用隐喻进行回答。由于我们已经告诉模型要以一致的语气回答，且有了这个例子，现在我们说“教我韧性”，它将以类似的语气回答下一个任务。

```python
prompt = f"""
你的任务是以一致的风格回答问题。

<child>: 教我耐心。

<grandparent>: 挖出最深峡谷的河流源于一处不起眼的泉眼；最宏伟的交响乐从单一的音符开始；最复杂的挂毯以一根孤独的线开始编织。

<child>: 教我韧性。
"""
response = get_completion(prompt)
print(response)
```

```auto
<grandparent>: 韧性就像是一棵树，它需要经历风吹雨打、寒冬酷暑，才能成长得更加坚强。在生活中，我们也需要经历各种挫折和困难，才能锻炼出韧性。记住，不要轻易放弃，坚持下去，你会发现自己变得更加坚强。
```

#### 2.3 指导模型思考

  如果任务太复杂，模型在匆忙中可能会推导出错误的结论（编造一些错误的猜测），就像在没有时间计算出答案的情况下完成复杂的数学问题，人类也可能会犯错误。所以我们可以重新构思prompt，请求模型先进行一系列相关的推理，再给出最终答案。这等于指示模型花更多时间一步步思考问题（step by step），也意味着它在任务上花费了更多的计算资源。  
![在这里插入图片描述](https://img-blog.csdnimg.cn/83154d7705744801a56ef89b9e61b08b.png#pic_center)

##### 2.3.1 指定任务步骤

  接下来我们将通过给定一个复杂任务，并给出完成该任务的一系列步骤，来展示这一策略的效果。

  首先我们描述了杰克和吉尔的故事，并给出推导最终答案的步骤。

+   用一句话概括三个反引号限定的文本；
+   将摘要翻译成法语；
+   在法语摘要中列出每个名称；
+   输出包含以下键的 JSON 对象：French\_summary，num\_names；
+   用换行符分隔答案。

```python
text = f"""
在一个迷人的村庄里，杰克和吉尔兄妹出发去山顶一个井里打水。他们一边唱着歌，一边往上爬，然而不幸降临——杰克被一块石头绊倒，从山上滚了下来，\
吉尔紧随其后。虽然略有些摔伤，但他们还是回到了温馨的家中。尽管出了这样的意外，他们的冒险精神依然没有减弱，继续充满愉悦地探索。
"""
# example 1
prompt_1 = f"""
执行以下操作：
1-用一句话概括下面用三个反引号括起来的文本。
2-将摘要翻译成法语。
3-在法语摘要中列出每个人名。
4-输出一个 JSON 对象，其中包含以下键：French_summary，num_names。

请用换行符分隔您的答案。

Text:
```{text}```
"""
response = get_completion(prompt_1)
print("prompt 1:")
print(response)
```

```auto
Completion for prompt 1:
Two siblings, Jack and Jill, go on a quest to fetch water from a well on a hilltop, but misfortune strikes and they both tumble down the hill, returning home slightly battered but with their adventurous spirits undimmed.

Deux frères et sœurs, Jack et Jill, partent en quête d'eau d'un puits sur une colline, mais un malheur frappe et ils tombent tous les deux de la colline, rentrant chez eux légèrement meurtris mais avec leurs esprits aventureux intacts. 
Noms（法语中的姓名）: Jack, Jill.

{
  "french_summary": "Deux frères et sœurs, Jack et Jill, partent en quête d'eau d'un puits sur une colline, mais un malheur frappe et ils tombent tous les deux de la colline, rentrant chez eux légèrement meurtris mais avec leurs esprits aventureux intacts.",
  "num_names": 2
}
```

  上述输出仍然存在一定问题，例如，键“姓名”会被替换为法语`Noms`，因此，我们给出一个更好的 Prompt，该 Prompt **指定了输出的格式**（标准化的输出格式可以让结果更有预测性）。

```python
prompt_2 = f"""
1-用一句话概括下面用<>括起来的文本。
2-将摘要翻译成英语。
3-在英语摘要中列出每个名称。
4-输出一个 JSON 对象，其中包含以下键：English_summary，num_names。

请使用以下格式：
文本：<要总结的文本>
摘要：<摘要>
翻译：<摘要的翻译>
名称：<英语摘要中的名称列表>
输出 JSON：<带有 English_summary 和 num_names 的 JSON>

Text: <{text}>
"""
response = get_completion(prompt_2)
print("\nprompt 2:")
print(response)
```

```auto
Completion for prompt 2:
Summary: Two siblings, Jack and Jill, go on a quest to fetch water from a well on a hilltop, but misfortune strikes and they both tumble down the hill, returning home slightly battered but with their adventurous spirits undimmed.
Translation: Jack and Jill, deux frères et sœurs, ont eu un accident en allant chercher de l'eau dans un puits de montagne, mais ils ont continué à explorer avec un esprit d'aventure.
Names: Jack, Jill
Output JSON: {"french_summary": "Jack and Jill, deux frères et sœurs, ont eu un accident en allant chercher de l'eau dans un puits de montagne, mais ils ont continué à explorer avec un esprit d'aventure.", "num_names": 2}
```

##### 2.3.2 要求模型事先自行计算

  有时候，在明确指导模型在做决策之前要思考解决方案时，我们会得到更好的结果。接下来我们会给出一个问题和一个学生的解答，要求模型判断解答是否正确。

```python
prompt = f"""
判断学生的解决方案是否正确。

问题:
我正在建造一个太阳能发电站，需要帮助计算财务。

    土地费用为 100美元/平方英尺
    我可以以 250美元/平方英尺的价格购买太阳能电池板
    我已经谈判好了维护合同，每年需要支付固定的10万美元，并额外支付每平方英尺10美元
    作为平方英尺数的函数，首年运营的总费用是多少。

学生的解决方案：
设x为发电站的大小，单位为平方英尺。
费用：

    土地费用：100x
    太阳能电池板费用：250x
    维护费用：100,000美元+100x
    总费用：100x+250x+100,000美元+100x=450x+100,000美元
"""
response = get_completion(prompt)
print(response)
```

```auto
学生的解决方案是正确的。
```

  但是注意，学生的解决方案实际上是错误的（维护费是10w+10x而不是100x）。我们可以通过指导模型先自行找出一个解法来解决这个问题。

  在接下来这个 Prompt 中，我们要求模型先自行解决这个问题，再根据自己的解法与学生的解法进行对比，从而判断学生的解法是否正确。同时，我们给定了输出的格式要求。通过明确步骤，让模型有更多时间思考，有时可以获得更准确的结果。

```python
prompt = f"""
请判断学生的解决方案是否正确，请通过如下步骤解决这个问题：

步骤：

    首先，自己解决问题。
    然后将你的解决方案与学生的解决方案进行比较，并评估学生的解决方案是否正确。在自己完成问题之前，请勿决定学生的解决方案是否正确。

使用以下格式：

    问题：问题文本
    学生的解决方案：学生的解决方案文本
    实际解决方案和步骤：实际解决方案和步骤文本
    学生的解决方案和实际解决方案是否相同：是或否
    学生的成绩：正确或不正确

问题：

    我正在建造一个太阳能发电站，需要帮助计算财务。 
    - 土地费用为每平方英尺100美元
    - 我可以以每平方英尺250美元的价格购买太阳能电池板
    - 我已经谈判好了维护合同，每年需要支付固定的10万美元，并额外支付每平方英尺10美元
    作为平方英尺数的函数，首年运营的总费用是多少。

学生的解决方案：

    设x为发电站的大小，单位为平方英尺。
    费用：
    1. 土地费用：100x
    2. 太阳能电池板费用：250x
    3. 维护费用：100,000+100x
    总费用：100x+250x+100,000+100x=450x+100,000

实际解决方案和步骤：
"""
response = get_completion(prompt)
print(response)
```

```auto
正确的解决方案和步骤：
    1. 计算土地费用：100美元/平方英尺 * x平方英尺 = 100x美元
    2. 计算太阳能电池板费用：250美元/平方英尺 * x平方英尺 = 250x美元
    3. 计算维护费用：10万美元 + 10美元/平方英尺 * x平方英尺 = 10万美元 + 10x美元
    4. 计算总费用：100x美元 + 250x美元 + 10万美元 + 10x美元 = 360x + 10万美元

学生的解决方案和实际解决方案是否相同：否

学生的成绩：不正确
```

  在这个例子中，学生的答案是错误的，但如果我们没有先让模型自己计算，那么可能会被误导以为学生是正确的

#### 2.4局限性

![在这里插入图片描述](https://img-blog.csdnimg.cn/d0b0131403b747c9890e309933acb867.png#pic_center)

> **虚假知识**：模型偶尔会生成一些看似真实实则编造的知识

  模型在训练过程中接触了大量的知识，但它并没有完全记住，因此它并不清楚自己的知识边界。这意味着模型在尝试回答比较晦涩的问题时，可能会编造听起来合理但实际上并不正确的答案，我们称这些编造的想法为`hallucination`（幻觉）。

  例如在如下示例中，我们要求模型告诉我们 Boie 公司生产的 AeroGlide UltraSlim Smart Toothbrush 产品的信息，事实上，这个公司是真实存在的，但产品是编造的，模型则会一本正经地告诉我们编造的知识。

```python
prompt = f"""
告诉我 Boie 公司生产的 AeroGlide UltraSlim Smart Toothbrush 的相关信息
"""
response = get_completion(prompt)
print(response)
```

```auto
Boie公司生产的AeroGlide UltraSlim Smart Toothbrush是一款智能牙刷，具有以下特点：

1. 超薄设计：刷头仅有0.8毫米的厚度，可以更容易地进入口腔深处，清洁更彻底。

2. 智能感应：牙刷配备了智能感应技术，可以自动识别刷头的位置和方向，确保每个部位都得到充分的清洁。

3. 高效清洁：牙刷采用了高速振动技术，每分钟可达到40000次，可以有效去除牙菌斑和污渍。

4. 轻松携带：牙刷采用了便携式设计，可以轻松放入口袋或旅行包中，随时随地进行口腔清洁。

5. 环保材料：牙刷采用了环保材料制造，不含有害物质，对环境友好。

总之，Boie公司生产的AeroGlide UltraSlim Smart Toothbrush是一款高效、智能、环保的牙刷，可以帮助用户轻松保持口腔健康。
```

  从上面的例子可以看出，模型会编造看上去非常逼真的知识，这有时会很危险。因此，请确保使用我们在本节中介绍的一些技巧，以尝试在构建自己的应用程序时避免这种情况。  
  另一种减少幻觉的策略是先要求模型找到文本中的任何相关引用，然后要求它使用这些引用来回答问题，这种追溯源文档的方法通常对减少幻觉非常有帮助。

> **说明：在本教程中，我们使用 \\ 来使文本适应屏幕大小以提高阅读体验，GPT 并不受 \\ 的影响，但在你调用其他大模型时，需额外考虑 \\ 是否会影响模型性能**

### 三、指令迭代

  当使用 LLM 构建应用程序时，很少是编写一次Prompt就得到最终的效果。但只要您有一个好的迭代过程来不断改进您的 Prompt，那么你就能够得到一个适合任务的 Prompt，所以**一个优化prompt的迭代过程，为特定应用挖掘出好的prompt，是非常重要的**。

  在本章中，我们将以从产品说明书中生成营销文案这一示例，展示一些框架，以提示你如何迭代地分析和完善你的 Prompt。

  之前的课程中我讲过机器学习开发的流程：

+   Idea：
+   Code：获取数据，编写代码
+   Ruselt：训练模型，得到实验结果。
+   Error Analysis：根据结果，进行错误分析，改进解决的思路或方法

  重复以上步骤，反复迭代，以获得有效的机器学习模型。在编写 Prompt 以使用 LLM 开发应用程序时，也是相似的过程。  
  当您有一个关于要完成的任务的想法，可以尝试编写第一个 Prompt，满足上一章说过的两个原则：**清晰明确，逐步思考**。然后您可以运行它并查看结果。如果第一次效果不好，那么迭代的过程就是找出为什么指令不够清晰或为什么没有给算法足够的时间思考，以便改进想法、改进提示等等，循环多次，直到找到适合您的应用程序的 Prompt。

![在这里插入图片描述](https://img-blog.csdnimg.cn/283184840a784d8db6ee0acdf0b20ccb.png#pic_center)

#### 3.1 环境配置

同上一章，我们首先需要配置 OpenAI API 的环境

```python
import openai
import os
from dotenv import load_dotenv, find_dotenv
# 导入第三方库

_ = load_dotenv(find_dotenv())
# 读取系统中的环境变量

openai.api_key  = os.getenv('OPENAI_API_KEY')
# 设置 API_KEY
```

```python
# 一个封装 OpenAI 接口的函数，参数为 Prompt，返回对应结果
def get_completion(prompt, model="gpt-3.5-turbo"):
    '''
    prompt: 对应的提示
    model: 调用的模型，默认为 gpt-3.5-turbo(ChatGPT)，有内测资格的用户可以选择 gpt-4
    '''
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0, # 模型输出的温度系数，控制输出的随机程度
    )
    # 调用 OpenAI 的 ChatCompletion 接口
    return response.choices[0].message["content"]

```

#### 3.2 从产品说明书生成一份营销描述

  这里有一个椅子的产品说明书，它的灵感来自于一个华丽的中世纪家族，然后讨论了构造、尺寸、椅子选项、材料等等，产地是意大利。假设您想要使用这份说明书帮助营销团队为在线零售网站撰写营销式描述。

```python
# 示例：产品说明书
fact_sheet_chair = """
概述

    美丽的中世纪风格办公家具系列，包括文件柜、办公桌、书柜、会议桌等。多种外壳颜色和底座涂层可选。
    可选塑料前后靠背装饰（SWC-100）或10种面料和6种皮革的全面装饰（SWC-110）。
    底座涂层选项为：不锈钢、哑光黑色、光泽白色或铬。椅子可带或不带扶手。
    适用于家庭或商业场所。符合合同使用资格。

结构

    五个轮子的塑料涂层铝底座。
    气动椅子调节，方便升降。

尺寸

    宽度53厘米|20.87英寸
    深度51厘米|20.08英寸
    高度80厘米|31.50英寸
    座椅高度44厘米|17.32英寸
    座椅深度41厘米|16.14英寸

选项

    软地板或硬地板滚轮选项。
    两种座椅泡沫密度可选：中等（1.8磅/立方英尺）或高（2.8磅/立方英尺）。
    无扶手或8个位置PU扶手。

材料
外壳底座滑动件

    改性尼龙PA6/PA66涂层的铸铝。
    外壳厚度：10毫米。
    座椅
    HD36泡沫

原产国

    意大利
"""
```

```python
# 提示：基于说明书创建营销描述
prompt = f"""
你的任务是帮助营销团队基于技术说明书创建一个产品的营销描述。根据```标记的技术说明书中提供的信息，编写一个产品描述。

技术说明: ```{fact_sheet_chair}```
"""
response = get_completion(prompt)
print(response)

```

```auto
产品描述：

我们自豪地推出美丽的中世纪风格办公家具系列，其中包括文件柜、办公桌、书柜、会议桌等。我们的产品采用多种外壳颜色和底座涂层，以满足您的个性化需求。您可以选择塑料前后靠背装饰（SWC-100）或10种面料和6种皮革的全面装饰（SWC-110），以使您的办公室更加舒适和时尚。

我们的底座涂层选项包括不锈钢、哑光黑色、光泽白色或铬，以满足您的不同需求。椅子可带或不带扶手，适用于家庭或商业场所。我们的产品符合合同使用资格，为您提供更加可靠的保障。

我们的产品采用五个轮子的塑料涂层铝底座，气动椅子调节，方便升降。尺寸为宽度53厘米|20.87英寸，深度51厘米|20.08英寸，高度80厘米|31.50英寸，座椅高度44厘米|17.32英寸，座椅深度41厘米|16.14英寸，为您提供舒适的使用体验。

我们的产品还提供软地板或硬地板滚轮选项，两种座椅泡沫密度可选：中等（1.8磅/立方英尺）或高（2.8磅/立方英尺），以及无扶手或8个位置PU扶手，以满足您的不同需求。

我们的产品采用改性尼龙PA6/PA66涂层的铸铝外壳底座滑动件，外壳厚度为10毫米，座椅采用HD36泡沫，为您提供更加舒适的使用体验。我们的产品原产国为意大利，为您提供更加优质的品质保证。
```

##### 3.2.1 迭代一：限制生成文本长度

  上面的答案很好地完成了要求，即从技术说明书开始编写产品描述，但是这个描述太长了。所以我会更新我的提示，要求最多使用50个字。

```python
# 优化后的 Prompt，要求生成描述不多于 50 词，原文都是英文。
prompt = f"""
您的任务是帮助营销团队基于技术说明书创建一个产品的零售网站描述。

根据```标记的技术说明书中提供的信息，编写一个产品描述。

使用最多50个词。

技术规格：```{fact_sheet_chair}```
"""
response = get_completion(prompt)
print(response)

```

```auto
Introducing our beautiful medieval-style office furniture collection, including filing cabinets, desks, bookcases, and conference tables. Choose from a variety of shell colors and base coatings, with optional plastic or fabric/leather decoration. The chair features a plastic-coated aluminum base with five wheels and pneumatic height adjustment. Perfect for home or commercial use. Made in Italy.
```

取出回答并根据空格拆分，答案为54个字，较好地完成了我的要求

```python
lst = response.split()
print(len(lst))
```

```auto
54    
```

> 你也可以考虑将长度限制描述为：使用3个句子、使用300个字符（英文）等等。

LLM在遵循非常精确的字数限制方面表现得还可以，但并不那么出色。有时它会输出60或65个单词的内容，但这还算是合理的。这原因是 LLM 解释文本使用一种叫做分词器的东西，但它们往往在计算字符方面表现一般般。有很多不同的方法来尝试控制你得到的输出的长度。

##### 3.2.2 迭代二：关注正确的细节

  我们会发现的第二个问题是，这个网站并不是直接向消费者销售，它实际上是向家具零售商销售家具，他们会更关心椅子的技术细节和材料。在这种情况下，你可以修改这个提示，让它更精确地描述椅子的技术细节（关注与目标受众相关的方面）。

```python
# 优化后的 Prompt，说明面向对象，应具有什么性质且侧重于什么方面
prompt = f"""
您的任务是帮助营销团队基于技术说明书创建一个产品的零售网站描述。根据```标记的技术说明书中提供的信息，编写一个产品描述。

该描述面向家具零售商，所以要更偏向技术性，并侧重于产品、材料和构造。

使用最多50个单词。

技术规格： ```{fact_sheet_chair}```
"""
response = get_completion(prompt)
print(response)
```

```auto
这款中世纪风格办公家具系列包括文件柜、办公桌、书柜和会议桌等，适用于家庭或商业场所。可选多种外壳颜色和底座涂层，底座涂层选项为不锈钢、哑光黑色、光泽白色或铬。椅子可带或不带扶手，可选软地板或硬地板滚轮，两种座椅泡沫密度可选。外壳底座滑动件采用改性尼龙PA6/PA66涂层的铸铝，座椅采用HD36泡沫。原产国为意大利。
```

  下面我想要在描述的结尾包括产品ID。所以我在prompt的结尾，用7个字符来描述每个产品的ID。

```python
# 更进一步，要求在描述末尾包含 7个字符的产品ID
prompt = f"""
Your task is to help a marketing team create a 
description for a retail website of a product based 
on a technical fact sheet.

Write a product description based on the information 
provided in the technical specifications delimited by 
triple backticks.

The description is intended for furniture retailers, 
so should be technical in nature and focus on the 
materials the product is constructed from.

At the end of the description, include every 7-character 
Product ID in the technical specification.

Use at most 50 words.

Technical specifications: ```{fact_sheet_chair}```
"""
response = get_completion(prompt)
print(response)
```

```auto
Introducing our beautiful medieval-style office furniture collection, featuring file cabinets, desks, bookshelves, and conference tables. Available in multiple shell colors and base coatings, with optional plastic or fabric/leather decorations. The chair comes with or without armrests and has a plastic-coated aluminum base with five wheels and pneumatic height adjustment. Suitable for home or commercial use. Made in Italy.

Product IDs: SWC-100, SWC-110
```

```python
prompt = f"""
您的任务是帮助营销团队基于技术说明书创建一个产品的零售网站描述。根据```标记的技术说明书中提供的信息，编写一个产品描述。

该描述面向家具零售商，因此应具有技术性质，并侧重于产品的材料构造。

在描述末尾，用7个字符来描述每个产品的ID。

使用最多50个单词。

技术规格： ```{fact_sheet_chair}```
"""
response = get_completion(prompt)
print(response)
```

```auto
这款中世纪风格的办公家具系列包括文件柜、办公桌、书柜和会议桌等，适用于家庭或商业场所。可选多种外壳颜色和底座涂层，底座涂层选项为不锈钢、哑光黑色、光泽白色或铬。椅子可带或不带扶手，可选塑料前后靠背装饰或10种面料和6种皮革的全面装饰。座椅采用HD36泡沫，可选中等或高密度，座椅高度44厘米，深度41厘米。外壳底座滑动件采用改性尼龙PA6/PA66涂层的铸铝，外壳厚度为10毫米。原产国为意大利。产品ID：SWC-100/SWC-110。
```

##### 3.2.3 迭代三：表格式描述

  下面展示一个更复杂的prompt示例，让大家更深入了解ChatGPT的能力。

  这里我添加了一些额外的说明，要求它抽取信息并组织成表格，并指定表格的表格名称、列名和格式，还要求它将所有内容格式化为可以在网页使用的 HTML。

```python
# 要求抽取信息并组织成表格，并指定表格名、列名和格式
prompt = f"""
您的任务是帮助营销团队基于技术说明书创建一个产品的零售网站描述。根据```标记的技术说明书中提供的信息，编写一个产品描述。

该描述面向家具零售商，因此应具有技术性质，并侧重于产品的材料构造。

在描述末尾，用7个字符来描述每个产品的ID。

在描述之后，生成一个表格，提供产品的尺寸。表格应该有两列。第一列包括尺寸的名称。第二列只包括英寸的测量值。

表格命名为“产品尺寸”。

将所有内容格式化为可用于网站的HTML格式。将描述放在<div>元素中。

技术规格：```{fact_sheet_chair}```
"""

response = get_completion(prompt)
print(response)
```

```auto
<div>
<h2>中世纪风格办公家具系列椅子</h2>
<p>这款椅子是中世纪风格办公家具系列的一部分，适用于家庭或商业场所。它有多种外壳颜色和底座涂层可选，包括不锈钢、哑光黑色、光泽白色或铬。您可以选择带或不带扶手的椅子，以及软地板或硬地板滚轮选项。此外，您可以选择两种座椅泡沫密度：中等（1.8磅/立方英尺）或高（2.8磅/立方英尺）。</p>
<p>椅子的外壳底座滑动件是改性尼龙PA6/PA66涂层的铸铝，外壳厚度为10毫米。座椅采用HD36泡沫，底座是五个轮子的塑料涂层铝底座，可以进行气动椅子调节，方便升降。此外，椅子符合合同使用资格，是您理想的选择。</p>
<p>产品ID：SWC-100</p>
</div>

<table>
  <caption>产品尺寸</caption>
  <tr>
    <th>宽度</th>
    <td>20.87英寸</td>
  </tr>
  <tr>
    <th>深度</th>
    <td>20.08英寸</td>
  </tr>
  <tr>
    <th>高度</th>
    <td>31.50英寸</td>
  </tr>
  <tr>
    <th>座椅高度</th>
    <td>17.32英寸</td>
  </tr>
  <tr>
    <th>座椅深度</th>
    <td>16.14英寸</td>
  </tr>
</table>
```

```python
# 表格是以 HTML 格式呈现的，加载出来
from IPython.display import display, HTML

display(HTML(response))
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/4e1e51c35aa84921a735e966ba6798f2.png)

#### 3.3 总结

  本章展示了 `LLM` 在开发应用程序中，prompt迭代式开发过程。开发者需要先尝试编写提示，然后通过迭代逐步完善它，直至得到需要的结果。关键在于拥有一种有效的开发Prompt的过程，而不是知道完美的Prompt。  
  对于一些更复杂的应用程序，可以迭代开发一个prompt并使用大量的examples进行评估。例如，在多个信息表上测试不同prompt上，了解多个信息表的平均或最差性能，这样可以让app更加的成熟（app在走向成熟时，必须有一些指标来推动最后几步增量的迅速改进）。另外，在使用 Jupyter 进行notebook示例时，请尝试不同的变化并查看结果。

### 四、摘要（Summarizing）

> ChatGPT API应用参考[《datawhalechina/HuggingLLM》](https://github.com/datawhalechina/hugging-llm/blob/main/content/ChatGPT%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97%E2%80%94%E2%80%94%E5%8F%A5%E8%AF%8D%E5%88%86%E7%B1%BB.ipynb)。

#### 4.1 引言

  当今世界有太多的文本信息，几乎没有人能够拥有足够的时间去阅读所有我们想了解的东西。但LLM最令人兴奋的应用之一，就是对文本进行概括。本章将介绍如何使用编程的方式，调用API接口来实现“文本概括”功能。

  首先，我们需要OpenAI包，加载API密钥，定义getCompletion函数。

```python
import openai
import os
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY

def get_completion(prompt, model="gpt-3.5-turbo"): 
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0, # 值越低则输出文本随机性越低
    )
    return response.choices[0].message["content"]
```

#### 4.2 单文本概括

  这里我们举了个商品评论的例子。对于电商平台来说，网站上往往存在着海量的商品评论，这些评论反映了所有客户的想法。如果我们拥有一个工具去概括这些海量、冗长的评论，便能够快速地浏览更多评论，洞悉客户的偏好，从而指导平台与商家提供更优质的服务。

**输入文本（中文翻译）**

```python
prod_review_zh = """
这个熊猫公仔是我给女儿的生日礼物，她很喜欢，去哪都带着。公仔很软，超级可爱，面部表情也很和善。但是相比于价钱来说，
它有点小，我感觉在别的地方用同样的价钱能买到更大的。快递比预期提前了一天到货，所以在送给女儿之前，我自己玩了会。
"""
```

##### 4.2.1 限制输出文本长度

尝试使用最多个30词进行总结

```python
prompt = f"""
Your task is to generate a short summary of a product review from an ecommerce site. 

Summarize the review below, delimited by triple 
backticks, in at most 30 words. 

Review: ```{prod_review}```
"""

response = get_completion(prompt)
print(response)
```

```auto
Soft and cute panda plush toy loved by daughter, but a bit small for the price. Arrived early.
```

中文翻译版本

```python
prompt = f"""
你的任务是从电子商务网站上生成一个产品评论的简短摘要。请对三个反引号之间的评论文本进行概括，最多30个词汇。

评论: ```{prod_review_zh}```
"""

response = get_completion(prompt)
print(response)
```

```auto
柔软可爱的熊猫毛绒玩具深受女儿的喜爱，但价格有点小。提前到货。
```

##### 4.2.2 侧重特定群体/角度

  有时，针对不同的业务，我们对文本的侧重会有所不同。例如对于商品评论文本，物流会更关心运输时效，商家更加关心价格与商品质量，平台更关心整体服务体验。  
  我们可以通过增加Prompt提示，来体现对于某个特定角度的侧重。

**侧重于运输**

```python
prompt = f"""
你的任务是从电子商务网站上生成一个产品评论的简短摘要。请对三个反引号之间的评论文本进行概括，最多30个词汇，并且聚焦在产品运输上。

评论: ```{prod_review_zh}```
"""

response = get_completion(prompt)
print(response)
```

```auto
熊猫毛绒玩具比预期提前了一天到货，相比它的价格而言，客户觉得玩具有点小。
```

可以看到，输出结果以“快递提前一天到货”开头，体现了对于快递效率的侧重。

**侧重于价格与质量**

```python
prompt = f"""
你的任务是从电子商务网站上生成一个产品评论的简短摘要。请对三个反引号之间的评论文本进行概括，最多30个词汇，并且聚焦在产品价格和质量上。

评论: ```{prod_review_zh}```
"""

response = get_completion(prompt)
print(response)
```

```auto
熊猫毛绒玩具柔软可爱，但对于这个尺寸来说，价格有点高。
```

可以看到，输出结果以“质量好、价格小贵、尺寸小”开头，体现了对于产品价格与质量的侧重。

##### 4.2.3 信息提取

  在上一节中，虽然我们通过添加关键角度侧重的Prompt，使得文本摘要更侧重于某一特定方面，但是可以发现，结果中也会保留一些其他信息，如价格与质量角度的概括中仍保留了“快递提前到货”的信息。  
  有时这些信息是有帮助的，但如果我们只想要提取某一角度的信息，并过滤掉其他所有信息，则可以要求LLM进行`Extract`（信息提取）而非(`Summarize`（文本概括）。

```python
prompt = f"""
你的任务是从电子商务网站上的产品评论中提取相关信息。请从以下三个反引号之间的评论文本中提取产品运输相关的信息，最多30个词汇。

评论: ```{prod_review_zh}```
"""

response = get_completion(prompt)
print(response)
```

```auto
快递比预期提前了一天到货。
```

#### 4.3 多文本概括prompt

  在实际的工作流中，我们往往有许许多多的评论文本，以下展示了一个基于for循环调用“文本概括”工具并依次打印的示例。当然，在实际生产中，对于上百万甚至上千万的评论文本，使用for循环也是不现实的，可能需要考虑整合评论、分布式等方法提升运算效率。

```python
review_1 = prod_review 

# review for a standing lamp
review_2 = """
Needed a nice lamp for my bedroom, and this one \
had additional storage and not too high of a price \
point. Got it fast - arrived in 2 days. The string \
to the lamp broke during the transit and the company \
happily sent over a new one. Came within a few days \
as well. It was easy to put together. Then I had a \
missing part, so I contacted their support and they \
very quickly got me the missing piece! Seems to me \
to be a great company that cares about their customers \
and products. 
"""

# review for an electric toothbrush
review_3 = """
My dental hygienist recommended an electric toothbrush, \
which is why I got this. The battery life seems to be \
pretty impressive so far. After initial charging and \
leaving the charger plugged in for the first week to \
condition the battery, I've unplugged the charger and \
been using it for twice daily brushing for the last \
3 weeks all on the same charge. But the toothbrush head \
is too small. I’ve seen baby toothbrushes bigger than \
this one. I wish the head was bigger with different \
length bristles to get between teeth better because \
this one doesn’t.  Overall if you can get this one \
around the $50 mark, it's a good deal. The manufactuer's \
replacements heads are pretty expensive, but you can \
get generic ones that're more reasonably priced. This \
toothbrush makes me feel like I've been to the dentist \
every day. My teeth feel sparkly clean! 
"""

# review for a blender
review_4 = """
So, they still had the 17 piece system on seasonal \
sale for around $49 in the month of November, about \
half off, but for some reason (call it price gouging) \
around the second week of December the prices all went \
up to about anywhere from between $70-$89 for the same \
system. And the 11 piece system went up around $10 or \
so in price also from the earlier sale price of $29. \
So it looks okay, but if you look at the base, the part \
where the blade locks into place doesn’t look as good \
as in previous editions from a few years ago, but I \
plan to be very gentle with it (example, I crush \
very hard items like beans, ice, rice, etc. in the \ 
blender first then pulverize them in the serving size \
I want in the blender then switch to the whipping \
blade for a finer flour, and use the cross cutting blade \
first when making smoothies, then use the flat blade \
if I need them finer/less pulpy). Special tip when making \
smoothies, finely cut and freeze the fruits and \
vegetables (if using spinach-lightly stew soften the \ 
spinach then freeze until ready for use-and if making \
sorbet, use a small to medium sized food processor) \ 
that you plan to use that way you can avoid adding so \
much ice if at all-when making your smoothie. \
After about a year, the motor was making a funny noise. \
I called customer service but the warranty expired \
already, so I had to buy another one. FYI: The overall \
quality has gone done in these types of products, so \
they are kind of counting on brand recognition and \
consumer loyalty to maintain sales. Got it in about \
two days.
"""

reviews = [review_1, review_2, review_3, review_4]
```

```python
for i in range(len(reviews)):
    prompt = f"""
    Your task is to generate a short summary of a product \ 
    review from an ecommerce site. 

    Summarize the review below, delimited by triple \
    backticks in at most 20 words. 

    Review: ```{reviews[i]}```
    """
    response = get_completion(prompt)
    print(i, response, "\n")
```

```auto
0 Soft and cute panda plush toy loved by daughter, but a bit small for the price. Arrived early. 

1 Affordable lamp with storage, fast shipping, and excellent customer service. Easy to assemble and missing parts were quickly replaced. 

2 Good battery life, small toothbrush head, but effective cleaning. Good deal if bought around $50. 

3 The product was on sale for $49 in November, but the price increased to $70-$89 in December. The base doesn't look as good as previous editions, but the reviewer plans to be gentle with it. A special tip for making smoothies is to freeze the fruits and vegetables beforehand. The motor made a funny noise after a year, and the warranty had expired. Overall quality has decreased. 
```

  如果你有一个网站，上面成百上千条评论。你可以建立一个控制面板，为大量的评论生成简短的摘要，这样就可以方便客户进行浏览，也方便你快速了解客户的想法。如果愿意，还可以随时点开，查看原始的详细评论。

### 五、推理（inferring）

#### 5.1 引言

  本章你将从产品评论和新闻文章中推断出情感和主题。这些任务可以看作是**模型接收文本作为输入并执行某种分析的过程**，比如提取标签、提取实体、理解文本情感等等。

  在传统的机器学习工作流程中，如果要做情感别识任务，需要收集数据集、训练模型、在云端部署模型并进行推断。这个过程需要很多工作，而且对于每个任务，如情感分析、提取实体等等，都需要训练和部署单独的模型。

  大型语言模型的一个非常好的特点是，对于许多这样的任务，你只需要编写一个prompt即可得到结果，而不需要进行大量的工作（便利性）。这极大地加快了应用程序开发的速度。你还可以只使用一个模型和一个 API 来执行许多不同的任务，而不需要弄清楚如何训练和部署许多不同的模型。

下面启动环境：

```python
import openai
import os

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY2")
openai.api_key = OPENAI_API_KEY
```

```python
def get_completion(prompt, model="gpt-3.5-turbo"):
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0, # this is the degree of randomness of the model's output
    )
    return response.choices[0].message["content"]
```

#### 5.2 情感识别

下面以一盏台灯的评价举例说明。  
**1\. 情感分类（正/负向）**

```python
# 中文
lamp_review_zh = """
我需要一盏漂亮的卧室灯，这款灯具有额外的储物功能，价格也不算太高。我很快就收到了它。在运输过程中，我们的灯绳断了，
但是公司很乐意寄送了一个新的。几天后就收到了。这款灯很容易组装，我发现少了一个零件，于是联系了他们的客服，他们很快就给我寄来了缺失的零件！
在我看来，Lumina 是一家非常关心顾客和产品的优秀公司！
"""
```

现在让我们来编写一个prompt来分类这个评论的情感，虽然产品有点问题，但最终结果是positive。

```python
# 中文
prompt = f"""
以下用三个反引号分隔的产品评论的情感是什么？评论文本: ```{lamp_review_zh}```
"""
response = get_completion(prompt)
print(response)
```

```auto
情感是积极的/正面的。
```

  如果你想要更简洁的答案，以便更容易进行后处理，可以在prompt里添加另一个指令，“用一个单词回答：「正面」或「负面」”

```python
prompt = f"""
以下用三个反引号分隔的产品评论的情感是什么？用一个单词回答：「正面」或「负面」。
评论文本: ```{lamp_review_zh}```
"""
response = get_completion(prompt)
print(response)
```

```auto
正面
```

**2\. 情感识别**

  下面仍然使用台灯评论，这次我要让它以列表形式识别出评论中的情感，不超过五个。

```python
# 中文
prompt = f"""
识别以下评论的情感，情感不超过五个，并将答案格式化为以逗号分隔的单词列表。

评论文本: ```{lamp_review_zh}```
"""
response = get_completion(prompt)
print(response)
```

```auto
满意,感激,信任,赞扬,愉快
```

**3\. 识别愤怒**

  对于很多企业来说，了解某个顾客是否非常生气很重要。生气的顾客可能值得额外关注，让客户支持或客户成功团队联系客户以了解情况，并为客户解决问题。

```python
# 中文
prompt = f"""
以下评论的作者是否表达了愤怒？评论用三个反引号分隔。给出是或否的答案。

评论文本: ```{lamp_review_zh}```
"""
response = get_completion(prompt)
print(response)
```

```auto
否
```

  如果使用常规的监督学习，想要建立所有这些分类器，不可能在几分钟内就做到这一点。我们鼓励大家尝试更改一些这样的prompt，让prompt对这个灯具评论做出不同的推论。

#### 5.3 信息抽取

  信息抽取是自然语言处理（NLP）的一部分，在下面的任务中，我们要从评价中抽取产品名和公司名。

  如果你试图总结在线购物电子商务网站的许多评论，那么弄清楚产品是什么，产品制作商是谁，评价的情感是什么，以跟踪特定产品或特定制造商的积极或消极情感趋势，可能会很有用。

  在下面这个示例中，我们要求它将响应格式化为一个 JSON 对象，其中key是物品和品牌名。

```python
# 中文
prompt = f"""
从评论中识别以下项目：
- 评论者购买的物品
- 制造该物品的公司

评论文本用三个反引号分隔。将你的响应格式化为以 “物品” 和 “品牌” 为键的 JSON 对象。
如果信息不存在，请使用 “未知” 作为值。
答案尽可能简短。
  
评论文本: ```{lamp_review_zh}```
"""
response = get_completion(prompt)
print(response)
```

```auto
{
  "物品": "卧室灯",
  "品牌": "Lumina"
}
```

  如上所示，产品是卧室灯，品牌是 Luminar，你可以轻松地将其加载到 Python 字典中，然后对此输出进行其他处理。

#### 5.4 多任务处理

  提取上面所有这些信息使用了 3 或 4 个prompt，但实际上可以编写单个prompt来同时提取所有这些信息。

```python
# 中文
prompt = f"""
用三个反引号分隔的部分是评论，从评论中识别以下项目：
- 情绪（正面或负面）
- 是否表达了愤怒？（是或否）
- 评论者购买的物品
- 制造该物品的公司

将您的答案格式化为 JSON 对象，以 “Sentiment”、“Anger”、“Item” 和 “Brand” 作为键。
如果信息不存在，请使用 “未知” 作为值。
答案尽可能简短。
将 Anger 值格式化为布尔值。

评论文本: ```{lamp_review_zh}```
"""
response = get_completion(prompt)
print(response)
```

```auto
{
  "Sentiment": "正面",
  "Anger": false,
  "Item": "卧室灯",
  "Brand": "Lumina"
}
```

#### 5.5 主题推断

  推断主题：给定一段长文本，这段文本是关于什么的？主题是什么？下面是一段虚假的报纸文章，关于政府工作人员对他们工作机构的满意度调查。

```python
# 中文
story_zh = """
在政府最近进行的一项调查中，要求公共部门的员工对他们所在部门的满意度进行评分。调查结果显示，NASA 是最受欢迎的部门，满意度为 95％。

一位 NASA 员工 John Smith 对这一发现发表了评论，他表示：
“我对 NASA 排名第一并不感到惊讶，这是一个与了不起的人一起工作的好地方。我为成为这样一个创新组织的一员感到自豪。”

NASA 的管理团队也对这一结果表示欢迎，主管 Tom Johnson 表示：
“我们很高兴听到我们的员工对 NASA 的工作感到满意。
我们拥有一支才华横溢、忠诚敬业的团队，他们为实现我们的目标不懈努力，看到他们的辛勤工作得到回报真是太棒了。”

调查还显示，社会保障管理局的满意度最低，只有 45％的员工表示满意。政府承诺解决调查中员工提出的问题，并努力提高所有部门的工作满意度。
"""
```

**1\. 推断文章的5个主题**

```python
# 中文
prompt = f"""
确定以下给定文本中讨论的五个主题。

每个主题用1-2个单词概括。

输出时用逗号分割每个主题。

给定文本: ```{story_zh}```
"""
response = get_completion(prompt)
print(response)
```

```auto
调查结果, NASA, 社会保障管理局, 员工满意度, 政府承诺
```

**2\. 识别给定的主题**

  假设新闻网站有以下感兴趣的主题：NASA、地方政府、工程、员工满意度、联邦政府等，我们要识别文章包含以上哪些主题，prompt可以写成：确定主题列表中的每个项目是否是文本中的主题。以 0 或 1 的形式给出答案列表。

```python
topic_list = [
    "nasa", "local government", "engineering", 
    "employee satisfaction", "federal government"
]
```

```python
# 中文
prompt = f"""
判断主题列表中的每一项是否是给定文本中的一个主题，

每个主题答案用 0 或 1表示，并以列表的形式给出。

主题列表：美国航空航天局、地方政府、工程、员工满意度、联邦政府

给定文本: ```{story_zh}```
"""
response = get_completion(prompt)
print(response)
```

```auto
美国航空航天局：1
地方政府：1
工程：0
员工满意度：1
联邦政府：1
```

  在机器学习中这称为 Zero-Shot ：没有给模型任何有标注的训练数据，仅凭prompt，它就能确定新闻文章涵盖了哪些主题。  
**3\. 新闻提醒**  
  如果我们想生成一个新闻提醒，也可以使用这个处理新闻的过程。假设我非常喜欢 NASA 所做的工作，就可以构建一个这样的系统，每当 NASA 新闻出现时，输出提醒。

```python
topic_dict = {i.split('：')[0]: int(i.split('：')[1]) for i in response.split(sep='\n')}
if topic_dict['美国航空航天局'] == 1:
    print("提醒: 关于美国航空航天局的新消息")
```

```auto
提醒: 关于美国航空航天局的新消息
```

  本章仅用几分钟时间，就构建了多个用于对文本进行推理的系统，这在以前需要熟练的机器学习开发人员数天甚至数周的时间。无论是对于熟练的机器学习开发人员还是对于新手来说，都可以使用prompt来快速构建和开发相当复杂的NLP任务。

### 六、机器转译（transforming）

#### 6.1引言

  LLM非常擅长将输入转换成不同的格式，例如多语言本翻译、语法纠正、语气调整、格式转换等。以前可能要写一堆正则表达式，非常痛苦，现在调用API接口就可以实现这些功能（用ChatGPT校对工作内容）。

启动环境：

```python
import openai
import os
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY2")
openai.api_key = OPENAI_API_KEY

def get_completion(prompt, model="gpt-3.5-turbo", temperature=0): 
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=temperature, # 值越低则输出文本随机性越低
    )
    return response.choices[0].message["content"]
```

#### 6.2 机器翻译

**1\. 中文转西班牙语**

```python
prompt = f"""
将以下中文翻译成西班牙语: \ 
```您好，我想订购一个搅拌机。```
"""
response = get_completion(prompt)
print(response)
```

```auto
Hola, me gustaría ordenar una batidora.
```

**2\. 识别语种**

```python
prompt = f"""
请告诉我以下文本是什么语种: 
```Combien coûte le lampadaire?```
"""
response = get_completion(prompt)
print(response)
```

```auto
这是法语。
```

**3\. 多语种翻译**

```python
prompt = f"""
请将以下文本分别翻译成中文、英文、法语和西班牙语: 
```I want to order a basketball.```
"""
response = get_completion(prompt)
print(response)
```

```auto
中文：我想订购一个篮球。
英文：I want to order a basketball.
法语：Je veux commander un ballon de basket.
西班牙语：Quiero pedir una pelota de baloncesto.
```

**4\. 通用翻译器**

  随着全球化与跨境商务的发展，交流的用户可能来自各个不同的国家，使用不同的语言，因此我们需要一个通用翻译器，识别各个消息的语种，并翻译成目标用户的母语，从而实现更方便的跨国交流。

  下面是几条不同语言的文本，我们编写更复杂的代码进行多任务处理（识别语种，并翻译为中文和英文）：

```python
user_messages = [
  "La performance du système est plus lente que d'habitude.",  # System performance is slower than normal         
  "Mi monitor tiene píxeles que no se iluminan.",              # My monitor has pixels that are not lighting
  "Il mio mouse non funziona",                                 # My mouse is not working
  "Mój klawisz Ctrl jest zepsuty",                             # My keyboard has a broken control key
  "我的屏幕在闪烁"                                             # My screen is flashing
]
```

```python
for issue in user_messages:
    prompt = f"告诉我以下文本是什么语种，直接输出语种，如法语，无需输出标点符号: ```{issue}```"
    lang = get_completion(prompt)
    print(f"原始消息 ({lang}): {issue}\n")

    prompt = f"""
    将以下消息分别翻译成英文和中文，并写成
    中文翻译：xxx
    英文翻译：yyy
    的格式：
    ```{issue}```
    """
    response = get_completion(prompt)
    print(response, "\n=========================================")
```

```auto
原始消息 (法语): La performance du système est plus lente que d'habitude.

中文翻译：系统性能比平时慢。
英文翻译：The system performance is slower than usual. 
=========================================
原始消息 (西班牙语): Mi monitor tiene píxeles que no se iluminan.

中文翻译：我的显示器有一些像素点不亮。
英文翻译：My monitor has pixels that don't light up. 
=========================================
原始消息 (意大利语): Il mio mouse non funziona

中文翻译：我的鼠标不工作了。
英文翻译：My mouse is not working. 
=========================================
原始消息 (波兰语): Mój klawisz Ctrl jest zepsuty

中文翻译：我的Ctrl键坏了
英文翻译：My Ctrl key is broken. 
=========================================
原始消息 (中文): 我的屏幕在闪烁

中文翻译：我的屏幕在闪烁。
英文翻译：My screen is flickering. 
=========================================
```

#### 6.3 语气/风格调整

  写作的语气往往会根据受众对象而有所调整。例如，对于工作邮件，我们常常需要使用正式语气与书面用词，而对同龄朋友的微信聊天，更多地会使用轻松、口语化的语气。

```python
prompt = f"""
将以下文本翻译成商务信函的格式: 
```小老弟，我小羊，上回你说咱部门要采购的显示器是多少寸来着？```
"""
response = get_completion(prompt)
print(response)
```

```auto
尊敬的XXX（收件人姓名）：

您好！我是XXX（发件人姓名），在此向您咨询一个问题。上次我们交流时，您提到我们部门需要采购显示器，
但我忘记了您所需的尺寸是多少英寸。希望您能够回复我，以便我们能够及时采购所需的设备。

谢谢您的帮助！

此致

敬礼

XXX（发件人姓名）
```

```python
prompt = f"""
请将以下文本翻译成中文，分别展示成正式与非正式两种语气: 
```Would you like to order a pillow?```
"""
response = get_completion(prompt)
print(response)
```

```auto
正式语气（formal）：请问您需要订购枕头吗？
非正式语气（informal）：你要不要订一个枕头？
```

#### 6.4 格式转换

  ChatGPT非常擅长不同格式之间的转换，例如JSON到HTML、XML、Markdown等。在下述例子中，我们有一个包含餐厅员工姓名和电子邮件的列表的JSON，我们希望将其从JSON转换为HTML。

```python
data_json = { "resturant employees" :[ 
    {"name":"Shyam", "email":"shyamjaiswal@gmail.com"},
    {"name":"Bob", "email":"bob32@gmail.com"},
    {"name":"Jai", "email":"jai87@gmail.com"}
]}
```

```python
prompt = f"""
将以下Python字典从JSON转换为HTML表格，保留表格标题和列名：{data_json}
"""
response = get_completion(prompt)
print(response)
```

```auto
<table>
  <caption>resturant employees</caption>
  <thead>
    <tr>
      <th>name</th>
      <th>email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Shyam</td>
      <td>shyamjaiswal@gmail.com</td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>bob32@gmail.com</td>
    </tr>
    <tr>
      <td>Jai</td>
      <td>jai87@gmail.com</td>
    </tr>
  </tbody>
</table>
```

```python
from IPython.display import display, Markdown, Latex, HTML, JSON
display(HTML(response))
```

resturant employees
| name | email |
| --- | --- |
| Shyam | shyamjaiswal@gmail.com |
| Bob | bob32@gmail.com |
| Jai | jai87@gmail.com |

#### 6.5 拼写检查、语法纠正

  拼写及语法的检查与纠正是一个十分常见的需求，特别是使用非母语使，例如发表英文论文时。

  下面句子中，部分存在拼写或语法问题。循环遍历每个句子，要求模型校对文本，如果正确则输出“未发现错误”，如果错误则输出纠正后的文本。

```python
text = [ 
  "The girl with the black and white puppies have a ball.",  # The girl has a ball.
  "Yolanda has her notebook.", # ok
  "Its going to be a long day. Does the car need it’s oil changed?",  # Homonyms
  "Their goes my freedom. There going to bring they’re suitcases.",  # Homonyms
  "Your going to need you’re notebook.",  # Homonyms
  "That medicine effects my ability to sleep. Have you heard of the butterfly affect?", # Homonyms
  "This phrase is to cherck chatGPT for spelling abilitty"  # spelling
]
```

```python
for i in range(len(text)):
    prompt = f"""请校对并更正以下文本，无需输出原始文本，只输出纠正后的文本，且保持语种不变。
    如没有发现任何错误，请说“未发现错误”。
    
    例如：
    输入：I are happy.
    输出：I am happy.
    ```{text[i]}```"""
    response = get_completion(prompt)
    print(i, response)
```

```auto
0 The girl with the black and white puppies has a ball.
1 未发现错误。
2 It's going to be a long day. Does the car need its oil changed?
3 Their goes my freedom. They're going to bring their suitcases.
4 输出：You're going to need your notebook.
5 That medicine affects my ability to sleep. Have you heard of the butterfly effect?
6 This phrase is to check chatGPT for spelling ability.
```

  以下是一个简单的纠错示例，输入原始文本，输出纠正后的文本，并用`Redlines`库输出纠错前后的差异。

```python
text = f"""
Got this for my daughter for her birthday cuz she keeps taking mine from my room.  Yes, adults also like pandas too.  She takes \
it everywhere with her, and it's super soft and cute.  One of the ears is a bit lower than the other, and I don't think that was \
designed to be asymmetrical. It's a bit small for what I paid for it though. I think there might be other options that are bigger for \
the same price.  It arrived a day earlier than expected, so I got to play with it myself before I gave it to my daughter.
"""
```

```python
prompt = f"校对并更正以下商品评论：```{text}```"
response = get_completion(prompt)
print(response)
```

```auto
I got this for my daughter's birthday because she keeps taking mine from my room. Yes, adults also like pandas too. She takes it everywhere with her, and it's super soft and cute. However, one of the ears is a bit lower than the other, and I don't think that was designed to be asymmetrical. It's also a bit smaller than I expected for the price. I think there might be other options that are bigger for the same price. On the bright side, it arrived a day earlier than expected, so I got to play with it myself before giving it to my daughter.
```

```python
response = """
I got this for my daughter's birthday because she keeps taking mine from my room. Yes, adults also like pandas too. She takes it everywhere with her, and it's super soft and cute. However, one of the ears is a bit lower than the other, and I don't think that was designed to be asymmetrical. It's also a bit smaller than I expected for the price. I think there might be other options that are bigger for the same price. On the bright side, it arrived a day earlier than expected, so I got to play with it myself before giving it to my daughter.
"""
```

```python
# 如未安装redlines，需先安装
!pip3.8 install redlines
```

```python
from redlines import Redlines
from IPython.display import display, Markdown

diff = Redlines(text,response)
display(Markdown(diff.output_markdown))
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/002529333c4a45ff979263d3452d55b6.png)

#### 6.6 综合样例：文本翻译+拼写纠正+风格调整+格式转换

```python
text = f"""
Got this for my daughter for her birthday cuz she keeps taking mine from my room.  Yes, adults also like pandas too.  She takes \
it everywhere with her, and it's super soft and cute.  One of the ears is a bit lower than the other, and I don't think that was \
designed to be asymmetrical. It's a bit small for what I paid for it though. I think there might be other options that are bigger for \
the same price.  It arrived a day earlier than expected, so I got to play with it myself before I gave it to my daughter.
"""
```

```python
prompt = f"""
针对以下三个反引号之间的英文评论文本，
首先进行拼写及语法纠错，
然后将其转化成中文，
再将其转化成优质淘宝评论的风格，从各种角度出发，分别说明产品的优点与缺点，并进行总结。
润色一下描述，使评论更具有吸引力。
输出结果格式为：
【优点】xxx
【缺点】xxx
【总结】xxx
注意，只需填写xxx部分，并分段输出。
将结果输出成Markdown格式。
```{text}```
"""
response = get_completion(prompt)
display(Markdown(response))
```

【优点】

+   超级柔软可爱，女儿生日礼物非常受欢迎。
+   成人也喜欢熊猫，我也很喜欢它。
+   提前一天到货，让我有时间玩一下。

【缺点】

+   一只耳朵比另一只低，不对称。
+   价格有点贵，尺寸有点小，可能有更大的同价位选择。

【总结】  
这只熊猫玩具非常适合作为生日礼物，柔软可爱，深受孩子喜欢。虽然价格有点贵，但尺寸有点小，不对称的设计也有点让人失望。如果你想要更大的同价位选择，可能需要考虑其他选项。总的来说，这是一款不错的熊猫玩具，值得购买。

### 七、文本扩展（Expanding）

#### 7.1 前言

  `Expanding`是将短文本，例如一组说明或主题列表，输入到大型语言模型中，让模型生成更长的文本，例如基于某个主题的电子邮件或论文。

  这样做有一些很好的用途，例如将大型语言模型用作头脑风暴的伙伴。但这种做法也存在一些问题，例如某人可能会使用它来生成大量垃圾邮件。因此，当你使用大型语言模型的这些功能时，请仅以负责任的方式和有益于人们的方式使用它们。

  在本章中，你将学会如何基于某些信息生成个性化的电子邮件。我们还将使用模型的另一个输入参数`temperature`，它控制了答案的多样性、随机性。

配置OpenAI API 的环境：

```python
# 将自己的 API-KEY 导入系统环境变量
!export OPENAI_API_KEY='api-key'
```

```python
import openai
import os
from dotenv import load_dotenv, find_dotenv
# 导入第三方库

_ = load_dotenv(find_dotenv())
# 读取系统中的环境变量

openai.api_key  = os.getenv('OPENAI_API_KEY')
# 设置 API_KEY
```

```python
# 一个封装 OpenAI 接口的函数，参数为 Prompt，返回对应结果
def get_completion(prompt, model="gpt-3.5-turbo", temperature=0):
    '''
    prompt: 对应的提示
    model: 调用的模型，默认为 gpt-3.5-turbo(ChatGPT)，有内测资格的用户可以选择 gpt-4
    temperature: 温度系数
    '''
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=temperature, # 模型输出的温度系数，控制输出的随机程度
    )
    # 调用 OpenAI 的 ChatCompletion 接口
    return response.choices[0].message["content"]

```

#### 7.2 定制客户邮件

给定客户评价和情感（情感也可以用prompt先提取），生成定制电子邮件回复客户，下面是一个示例：

```python
# 在推理那章，已经学习了对一个评论判断其情感倾向
sentiment = "negative"

# 一个产品的评价
review = f"""
他们在11月份的季节性销售期间以约49美元的价格出售17件套装，折扣约为一半。\
但由于某些原因（可能是价格欺诈），到了12月第二周，同样的套装价格全都涨到了70美元到89美元不等。\
11件套装的价格也上涨了大约10美元左右。\
虽然外观看起来还可以，但基座上锁定刀片的部分看起来不如几年前的早期版本那么好。\
不过我打算非常温柔地使用它，例如，\
我会先在搅拌机中将像豆子、冰、米饭等硬物研磨，然后再制成所需的份量，\
切换到打蛋器制作更细的面粉，或者在制作冰沙时先使用交叉切割刀片，然后使用平面刀片制作更细/不粘的效果。\
制作冰沙时，特别提示：\
将水果和蔬菜切碎并冷冻（如果使用菠菜，则轻轻煮软菠菜，然后冷冻直到使用；\
如果制作果酱，则使用小到中号的食品处理器），这样可以避免在制作冰沙时添加太多冰块。\
大约一年后，电机发出奇怪的噪音，我打电话给客服，但保修已经过期了，所以我不得不再买一个。\
总的来说，这些产品的总体质量已经下降，因此它们依靠品牌认可和消费者忠诚度来维持销售。\
货物在两天内到达。
"""
```

  上面是一个关于搅拌机的客户评价，现在我们将根据情感定制回复。

  这里的prompt是：假设你是一个AI客户代理（这种透明度是很重要的，让客户直到邮件是AI生成的），你的任务是为客户发送电子邮件回复，根据通过三个反引号分隔的客户电子邮件，生成一封回复以感谢客户的评价。

```python
prompt = f"""
你是一位客户服务的AI助手。
你的任务是给一位重要客户发送邮件回复。
根据客户通过“```”分隔的评价，生成回复以感谢客户的评价。提醒模型使用评价中的具体细节
用简明而专业的语气写信。
作为“AI客户助手”签署电子邮件。
客户评论：
```{review}```
评论情感：{sentiment}
"""
response = get_completion(prompt)
print(response)
```

```auto
尊敬的客户，

非常感谢您对我们产品的评价。我们非常抱歉您在购买过程中遇到了价格上涨的问题。我们一直致力于为客户提供最优惠的价格，但由于市场波动，价格可能会有所变化。我们深表歉意，如果您需要任何帮助，请随时联系我们的客户服务团队。

我们非常感谢您对我们产品的详细评价和使用技巧。我们将会把您的反馈传达给我们的产品团队，以便改进我们的产品质量和性能。

再次感谢您对我们的支持和反馈。如果您需要任何帮助或有任何疑问，请随时联系我们的客户服务团队。

祝您一切顺利！

AI客户代理
```

#### 7.3 使用温度系数

  接下来，我们将使用语言模型的一个称为“温度”的参数，它将允许我们改变模型响应的多样性。您可以将温度视为模型探索或随机性的程度。

  一般来说，在构建需要可预测响应的应用程序或者可靠、可预测的系统时，我建议使用温度为零。如果您尝试以更具创意的方式使用模型，需要更多样化的输出结果，可以使用更高的温度。

>   例如，在一个特定的短语中，“我的最爱食品”最有可能的下一个词是“比萨”，其次最有可能的是“寿司”和“玉米饼”。因此，在温度为零时，模型将总是选择最有可能的下一个词。而在较高的温度下，它还将选择其中一个不太可能的词，在更高的温度下，它甚至可能选择玉米饼。随着模型的继续，响应将变得越来越不同。  
> ![在这里插入图片描述](https://img-blog.csdnimg.cn/e1095b531c9446b1a7988763f40a0777.png#pic_center)

```python
prompt = f"""
你是一名客户服务的AI助手。你的任务是给一位重要的客户发送邮件回复。根据通过“```”分隔的客户电子邮件生成回复，以感谢客户的评价。
如果情感是积极的或中性的，感谢他们的评价。如果情感是消极的，道歉并建议他们联系客户服务。
请确保使用评论中的具体细节。以简明和专业的语气写信。以“AI客户代理”的名义签署电子邮件。
客户评价：```{review}```
评论情感：{sentiment}
"""
response = get_completion(prompt, temperature=0.7)
print(response)
```

```auto
尊敬的客户，

非常感谢您对我们产品的评价。我们由衷地为您在购买过程中遇到的问题表示抱歉。我们确实在12月份的第二周调整了价格，但这是由于市场因素所致，并非价格欺诈。我们深刻意识到您对产品质量的担忧，我们将尽一切努力改进产品，以提供更好的体验。

我们非常感激您对我们产品的使用经验和制作技巧的分享。您的建议和反馈对我们非常重要，我们将以此为基础，进一步改进我们的产品。

如果您有任何疑问或需要进一步帮助，请随时联系我们的客户服务部门。我们将尽快回复您并提供帮助。

最后，请再次感谢您对我们产品的评价和选择。我们期待着未来与您的合作。

此致

敬礼

AI客户代理
```

  可以看到，温度=0.7时，生成了不同的电子邮件，可以认为答案更有创造力。

### 八、 聊天机器人

#### 8.1 前言

  使用一个大型语言模型的一个令人兴奋的事情是，我们可以用它来构建一个定制的聊天机器人，只需要很少的工作量。在这一节中，我们将探索如何利用聊天格式（接口）与个性化或专门针对特定任务或行为的聊天机器人进行延伸对话。

启动配置环境：

```python
import os
import openai

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY2")
openai.api_key = OPENAI_API_KEY
```

  像 `ChatGPT` 这样的聊天模型，被训练成以一系列用户消息（user）作为输入，以模型生成的内容消息（assistant message）作为输出的模型。这种聊天格式的设计旨在使多轮对话变得容易，同时对于没有任何对话的单轮任务也同样有用。  
![在这里插入图片描述](https://img-blog.csdnimg.cn/727a1b06438046288423aff56c9cadf6.png#pic_center)

  接下来我们使用两个辅助函数：

+   `get_completion`：以单一prompt为输入（单轮对话），以单一内容为输出的函数。
+   `get_completion_from_messages`：输入是一个来自不同角色的消息列表，这些角色可以使用不同的描述；然后输出多轮对话的结果。下面是一个消息列表的例子：
    +   `system massage`：对话的总体指示，用于设置助手（ChatGPT）的行为和角色；
    +   `user massage`：用户消息。比如在ChatGPT 网页界面，你输入的消息就是用户消息；
    +   `assistant massage`：助手消息，即ChatGPT 输出的消息。
    +   设定了system massage之后，通常是几轮user和assistant之间的对话信息，这些就构成了消息列表。  
        ![在这里插入图片描述](https://img-blog.csdnimg.cn/a0c0848135cc459ea89e281471080023.png#pic_center)

>   system massage的好处是为开发者提供了一种方法，在不让请求本身成为对话的一部分的情况下，引导assistant并指导其回应，并不使用户察觉（在GPT-4中用户也可以设置system massage）。

```python
def get_completion(prompt, model="gpt-3.5-turbo"):
	# 单轮对话
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0, # 控制模型输出的随机程度
    )
    return response.choices[0].message["content"]

def get_completion_from_messages(messages, model="gpt-3.5-turbo", temperature=0):
	# 多轮对话
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=temperature, # 控制模型输出的随机程度
    )
#     print(str(response.choices[0].message)) # 打印整个massage，结果包含content和role
    return response.choices[0].message["content"]
```

  现在让我们尝试在对话中使用这些消息。我们将使用上面的函数来获取从这些消息中得到的回答，同时，使用更高的 temperature（越高生成的越多样）。

#### 8.2 聊天机器人

  下面给出几个多轮对话的例子。system将assistant设定为一个说话像莎士比亚的，然后设置了3条user和assistant之间的消息。

```python
# 中文
messages =  [  
{'role':'system', 'content':'你是一个像莎士比亚一样说话的助手。'},    
{'role':'user', 'content':'给我讲个笑话'},   
{'role':'assistant', 'content':'鸡为什么过马路'},   
{'role':'user', 'content':'我不知道'}  ]
```

```python
response = get_completion_from_messages(messages, temperature=1)
print(response)
```

```auto
因为它要去找“母鸡”。哈哈哈！（注：此为英文双关语，"chicken"是鸡的意思，也是胆小的意思；"cross the road"是过马路的意思，也是“破坏规则”的意思。）
```

  让我们做另一个例子。system将assistant设定为“你是一个友好的聊天机器人”，第一个用户消息是“是的，你能提醒我我的名字是什么吗？”

```python
# 中文
messages =  [  
{'role':'system', 'content':'你是个友好的聊天机器人。'},    
{'role':'user', 'content':'好，你能提醒我，我的名字是什么吗？'}  ]
response = get_completion_from_messages(messages, temperature=1)
print(response)
```

```auto
抱歉，我不知道您的名字，因为我们是虚拟的聊天机器人，和现实生活中的人类在不同的世界中。
```

  如上所见，模型实际上并不知道我的名字。

  因此，每次与语言模型的交互都是一个独立的交互，这意味着我们必须提供所有相关的消息，以便模型在当前对话中进行引用。如果想让模型引用或 “记住” 对话的早期部分，则必须在模型的输入中提供早期的交流，我们将其称为上下文。让我们再试试。

```python
# 中文
messages =  [  
{'role':'system', 'content':'你是个友好的聊天机器人。'},
{'role':'user', 'content':'Hi, 我是Isa'},
{'role':'assistant', 'content': "Hi Isa! 很高兴认识你。今天有什么可以帮到你的吗?"},
{'role':'user', 'content':'是的，你可以提醒我, 我的名字是什么?'}  ]
response = get_completion_from_messages(messages, temperature=1)
print(response)
```

```auto
当然可以！您的名字是Isa。
```

  现在我们已经给模型提供了上下文，也就是之前的对话中提到的我的名字，然后我们会问同样的问题，模型就能够做出回应。

#### 8.3 点餐机器人（orderbot）

  现在，我们构建一个 “点餐机器人”，我们需要它自动收集用户信息，接受比萨饼店的订单。

  下面这个函数将自动收集我们的用户消息，然后将其附加到一个名为上下文的列表中，而不用我们手动输入，然后在每次调用模型时使用该上下文。模型的响应也会被添加到上下文中，因此上下文会越来越变长，模型就可以通过多轮对话的上下文信息来确定下一步要做什么。

```python
def collect_messages(_):
    prompt = inp.value_input
    inp.value = ''
    context.append({'role':'user', 'content':f"{prompt}"})
    response = get_completion_from_messages(context) 
    context.append({'role':'assistant', 'content':f"{response}"})
    panels.append(
        pn.Row('User:', pn.pane.Markdown(prompt, width=600)))
    panels.append(
        pn.Row('Assistant:', pn.pane.Markdown(response, width=600, style={'background-color': '#F6F6F6'})))
 
    return pn.Column(*panels)
```

  现在，我们将设置并运行这个 UI 来显示订单机器人。初始的上下文包含了包含菜单的系统消息。请注意，上下文会随着时间的推移而不断增长。

```python
!pip install panel
```

```python
# 中文
import panel as pn  # GUI
pn.extension()

panels = [] # collect display 

context = [{'role':'system', 'content':"""
你是订餐机器人，为披萨餐厅自动收集订单信息。
你要首先问候顾客。然后等待用户回复收集订单信息。收集完信息需确认顾客是否还需要添加其他内容。
最后需要询问是否自取或外送，如果是外送，你要询问地址。
最后告诉顾客订单总金额，并送上祝福。

请确保明确所有选项、附加项和尺寸，以便从菜单中识别出该项唯一的内容。
你的回应应该以简短、非常随意和友好的风格呈现。

菜单包括：

菜品：
意式辣香肠披萨（大、中、小） 12.95、10.00、7.00
芝士披萨（大、中、小） 10.95、9.25、6.50
茄子披萨（大、中、小） 11.95、9.75、6.75
薯条（大、小） 4.50、3.50
希腊沙拉 7.25

配料：
奶酪 2.00
蘑菇 1.50
香肠 3.00
加拿大熏肉 3.50
AI酱 1.50
辣椒 1.00

饮料：
可乐（大、中、小） 3.00、2.00、1.00
雪碧（大、中、小） 3.00、2.00、1.00
瓶装水 5.00
"""} ]  # accumulate messages


inp = pn.widgets.TextInput(value="Hi", placeholder='Enter text here…')
button_conversation = pn.widgets.Button(name="Chat!")

interactive_conversation = pn.bind(collect_messages, button_conversation)

dashboard = pn.Column(
    inp,
    pn.Row(button_conversation),
    pn.panel(interactive_conversation, loading_indicator=True, height=300),
)
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/74d7f879e49a4edeb04e0707ef960e5d.png#pic_center)

下面是点餐机器人设定的system massage：  
  你是一个orderbot，为一家比萨店收集订单的自动化服务。首先问候顾客，然后收集订单。接着问顾客是自取还是配送。等待并收集完整个订单之后，总结一下并进行最后检查，看顾客是否还要添加别的东西。如果要配淞，问一下配送地址。最后计算出所有费用，确保所有项目、附加费、额外费、尺寸清晰明了。你需要以简短、健谈、友好的风格来回答。菜单包括…  
![在这里插入图片描述](https://img-blog.csdnimg.cn/8673300a76a14cba85196304c4ff910a.png#pic_center)

  我们可以要求模型创建一个 JSON的订餐摘要发送给订单系统。所以我们现在追加另一个system massage，它是另一条prompt。这里也可以在这里使用用户消息，不一定是系统消息。

```python
messages =  context.copy()
messages.append(
{'role':'system', 'content':'创建上一个食品订单的 json 摘要。\
逐项列出每件商品的价格，字段应该是 1) 披萨，包括大小 2) 配料列表 3) 饮料列表，包括大小 4) 配菜列表包括大小 5) 总价'},    
)

response = get_completion_from_messages(messages, temperature=0)
print(response)
```

  请注意，这里我们使用了一个较低的temperature，因为对于这些类型的任务，我们希望输出相对可预测。

```auto
以下是上一个食品订单的 JSON 摘要：

```
{
  "order": {
    "pizza": {
      "type": "芝士披萨",
      "size": "大",
      "price": 10.95
    },
    "toppings": [
      {
        "name": "蘑菇",
        "price": 1.5
      }
    ],
    "drinks": [
      {
        "name": "雪碧",
        "size": "大",
        "price": 3
      },
      {
        "name": "雪碧",
        "size": "大",
        "price": 3
      }
    ],
    "sides": [],
    "total_price": 18.45
  }
}
注意：我假设蘑菇大奶酪披萨的价格是12.45美元，而不是12.95美元，因为顾客只点了一种浇头。
```

  现在，我们已经建立了自己的订餐聊天机器人。你可以随便修改system massage，以更改聊天机器人的行为，并使其扮演不同的角色和拥有不同的知识。你也可以修改菜单或prompt来创建自己的订单机器人！

### 九、总结

在这门课程中，我们学习了：

+   关于prompt的两个关键原则：
    
    +   编写清晰具体的指令；
    +   给模型一些思考时间（step by step）。
+   迭代式prompt开发的方法，并了解了如何找到适合你应用程序的prompt的过程是非常关键的。
    
+   介绍了大型语言模型的功能，包括摘要、推断、转换和扩展。
    
+   构建自定义聊天机器人。
    

  我们希望你能想出一些应用程序的想法，并尝试自己构建它们。你可以从一个非常小的项目开始，也许它具有一定的实用价值，也可能完全没有实用价值，只是一些有趣好玩儿的东西。请利用你第一个项目的学习经验来构建更好的第二个项目，甚至更好的第三个项目等。或者，如果你已经有一个更大的项目想法，那就去做吧。

  大型语言模型非常强大，作为提醒，我们希望大家负责任地使用它们，请仅构建对他人有积极影响的东西。在这个时代，构建人工智能系统的人可以对他人产生巨大的影响。因此必须负责任地使用这些工具。

  现在，基于大型语言模型构建应用程序是一个非常令人兴奋和不断发展的领域。现在你已经完成了这门课程，我们认为你现在拥有了丰富的知识，可以帮助你构建其他人今天不知道如何构建的东西。因此，我希望你也能帮助我们传播并鼓励其他人也参加这门课程。

  最后，希望你在完成这门课程时感到愉快，感谢你完成了这门课程。我们期待听到你构建的惊人之作。

