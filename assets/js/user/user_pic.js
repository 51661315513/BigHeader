 $(function() {
     // 1.1 获取裁剪区域的 DOM 元素
     var $image = $('#image')
         // 1.2 配置选项
     const options = {
         // 纵横比
         aspectRatio: 1,
         // 指定预览区域
         preview: '.img-preview'
     }

     var layer = layui.layer;
     // 1.3 创建裁剪区域
     $image.cropper(options)
         //  给上传按钮设置点击事件
     $('#btnChooesImage').on('click', function() {
             $('#file').click();
         })
         //  给选择文件框添加 change 事件
     $('#file').on('change', function(e) {
         var fileList = e.target.files
         if (fileList.length === 0) {
             return '请选择文件'
         }
         //  将选中的文件转为路径
         var imgUrl = URL.createObjectURL(e.target.files[0]);
         $image.cropper('destroy').attr('src', imgUrl).cropper(options)

     })
     $('#btnUpload').on('click', function() {
         //  拿到用户裁剪过后的头像
         var dataURL = $image
             .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                 width: 100,
                 height: 100
             })
             .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
         $.ajax({
             method: 'POST',
             url: '/my/update/avatar',
             data: {
                 avatar: dataURL
             },
             success: function(res) {
                 if (res.status !== 0) {
                     return layer.msg('修改头像失败');
                 }
                 window.parent.getUserInfo();
             }
         })
     })
 })