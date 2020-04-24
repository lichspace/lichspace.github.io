# css技巧
>开发H5可视化过程中遇到的css问题

### 如何设置chrome下select为直角，（border-radius:0 不起作用）
```javascript
select {
  -webkit-appearance: none;
  -webkit-border-radius: 0;
}
```

### grid-template-columns: 1/-1;
代表横跨第一栏到最后一栏目

