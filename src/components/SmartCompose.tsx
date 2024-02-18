import React, { useState } from 'react';
import './SmartCompose.css'
const SmartCompose = () => {
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [caretPosition, setCaretPosition] = useState(0);
  const [lineNumber,setLineNumber] = useState(0);

  const handleInputChange = (event: { target: { value: any; }; }) => {
    const text = event.target.value;
    setInputText(text);

    // 字符串处理
    const lastSpecialCharString = stringHandling(text)
    
    // 在这里实现智能撰写逻辑，根据用户输入生成建议
    // 这里只是一个示例，您需要根据您的需求修改它
    const suggestedSentences:Array<String> = generateSuggestions(lastSpecialCharString);
    setSuggestions(suggestedSentences);
  };
  const stringHandling = (text:string) => {
    // 计算当前光标所在行数
    let nsplit = text.split('\n');
    //设置光标的行数
    setLineNumber(nsplit.length)
    // 设置计算当前光标所处第几行并且前面有多少个字符
    let newtext = nsplit[nsplit.length - 1]
    setCaretPosition(typeof newtext == 'string'?newtext.length:0);

    const specialCharacterRegex = /[^\w\s]/g; // 匹配所有非字母、非数字和非空白字符
    // 使用正则表达式匹配字符串中的所有特殊字符
    const matches = text.matchAll(specialCharacterRegex);
    let lastIndex:Number = -1;
    // 遍历匹配结果，记录最后一个特殊字符的位置
    for (const match of matches) {
      lastIndex = match.index;
    }
    // 如果找到了特殊字符，则返回特殊字符后面的内容；否则返回空字符串
    return lastIndex !== -1 ? text.substring(lastIndex + 1,text.length-1) : '';
  }

  // tab 按下事件
  const handleTabPress = (event: { key: string; preventDefault: () => void; }) => {
    if (event.key === 'Tab' && suggestions.length > 0) {
      event.preventDefault();
      const selectedSuggestion = suggestions[0]; // 选择第一个建议
      setInputText(selectedSuggestion);
      setSuggestions([]); // 清空建议列表
    }
  };
  
  const generateSuggestions = (text: string) => {
    // 在这里实现智能撰写的逻辑，根据输入文本生成建议
    // 这里只是一个示例，您需要根据您的需求修改它
    const suggestions = [
      'Hello, how are you?',
      'I hope you are doing well.',
      'Please let me know if you have any questions.',
    ];
    return suggestions.filter((sentence) =>
      sentence.toLowerCase().startsWith(text.toLowerCase())
    );
  };

  return (
    <div className='box'>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleTabPress}
        placeholder="Start typing..."
      />
      <span>
        {suggestions.map((sentence, index) => (
          <span key={index} className='tips' style={{left: `${caretPosition * 6 + 2}px`,top: `${(lineNumber - 1) * 13}px`}}>{sentence}</span>
        ))}
      </span>
    </div>
  );
};

export default SmartCompose;
