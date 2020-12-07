$(function() {

})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        Header: {
            Authorization: localStorage.setItem('token') || ''
        },
        success: function(res) {
            if (res.status !== 0) {
                return '获取用户信息失败！'
            }
            renderAvatar(res.data)
        }

    })
}

function renderAvatar(data) {

}