import { Button, Divider, Modal, Space } from 'antd';
import { useState } from 'react';

const PolicyModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <span onClick={showModal} className='text-[#1d4ed8] hover:cursor-pointer hover:underline'>
                Điều khoản dịch vụ và Chính sách bảo mật
            </span>

            <Modal
                open={isModalVisible}
                width={800}
                onCancel={handleCancel}
                footer={[
                    <Button key='back' onClick={handleCancel}>
                        Đóng
                    </Button>,
                ]}
            >
                <Space direction='vertical'>
                    <div className='text-xl font-semibold'>Điều khoản dịch vụ (ToS)</div>

                    <Divider orientation='left' className='border-[#1d4ed8] text-lg font-medium'>
                        1. Giới thiệu
                    </Divider>
                    <div className='text-base'>
                        Chào mừng bạn đến với <span className='text-hover'>Bittis Store</span>. Những Điều khoản dịch vụ
                        (gọi tắt là &apos;ToS&apos;) này điều chỉnh việc sử dụng trang web và dịch vụ của chúng tôi.
                        Bằng cách truy cập hoặc sử dụng trang web của chúng tôi, bạn đồng ý tuân thủ và bị ràng buộc bởi
                        các điều khoản này. Nếu bạn không đồng ý, vui lòng không sử dụng dịch vụ của chúng tôi.
                    </div>

                    <Divider orientation='left' className='border-[#1d4ed8] text-lg font-medium'>
                        2. Đăng ký tài khoản
                    </Divider>

                    <div className='text-base'>
                        Để truy cập một số tính năng nhất định, bạn cần tạo một tài khoản. Bạn đồng ý cung cấp thông tin
                        chính xác và đầy đủ trong quá trình đăng ký và duy trì thông tin này luôn được cập nhật. Bạn
                        chịu trách nhiệm bảo mật tài khoản và mật khẩu của mình cũng như tất cả các hoạt động diễn ra
                        dưới tài khoản của bạn.
                    </div>

                    <Divider orientation='left' className='border-[#1d4ed8] text-lg font-medium'>
                        3. Sử dụng dịch vụ
                    </Divider>

                    <div className='text-base'>
                        Bạn đồng ý sử dụng dịch vụ của Morata chỉ cho các mục đích hợp pháp và tuân theo các điều khoản
                        này.
                        <br /> Bạn đồng ý không:
                        <br /> - Sử dụng dịch vụ của chúng tôi cho bất kỳ mục đích bất hợp pháp hoặc không được phép
                        nào.
                        <br /> - Can thiệp hoặc làm gián đoạn hoạt động của trang web của chúng tôi. <br /> - Cố gắng
                        truy cập trái phép vào bất kỳ phần nào của trang web.
                    </div>

                    <Divider orientation='left' className='border-[#1d4ed8] text-lg font-medium'>
                        4. Mô tả sản phẩm
                    </Divider>

                    <div className='text-base'>
                        Chúng tôi cố gắng cung cấp thông tin mô tả sản phẩm và tình trạng sẵn có một cách chính xác. Tuy
                        nhiên, chúng tôi không đảm bảo rằng mô tả sản phẩm hoặc các nội dung khác là chính xác, đầy đủ,
                        đáng tin cậy, hoặc không có lỗi. Nếu một sản phẩm được cung cấp bởi Morata không đúng như mô tả,
                        giải pháp duy nhất của bạn là trả lại sản phẩm trong tình trạng chưa sử dụng.
                    </div>

                    <Divider orientation='left' className='border-[#1d4ed8] text-lg font-medium'>
                        5. Giá cả và Thanh toán
                    </Divider>

                    <div className='text-base'>
                        Tất cả các mức giá có thể thay đổi mà không cần thông báo trước. Chúng tôi chấp nhận các hình
                        thức thanh toán khác nhau như thanh toán online, và thanh toán khi nhận hàng. Nếu như thanh toán
                        online thì sẽ được miễn phí vận chuyển và thuế. Thuế VAT mặc định là 10% phí tổng đơn hàng. Nếu
                        như đơn hàng của bạn vượt quá 50 triệu Việt Nam đồng (50.000.000 VNĐ) thì bạn bắt buộc phải
                        thanh toán online.
                    </div>

                    <Divider orientation='left' className='border-[#1d4ed8] text-lg font-medium'>
                        6. Vận chuyển và Giao hàng
                    </Divider>

                    <div className='text-base'>
                        Thời gian vận chuyển và giao hàng chỉ là ước tính và có thể thay đổi. Chúng tôi không chịu trách
                        nhiệm cho các sự chậm trễ do các đơn vị vận chuyển gây ra. Quyền sở hữu và rủi ro mất mát đối
                        với tất cả các sản phẩm sẽ chuyển giao cho bạn khi sản phẩm được giao.
                    </div>

                    <Divider orientation='left' className='border-[#1d4ed8] text-lg font-medium'>
                        7. Hủy đơn hàng
                    </Divider>

                    <div className='text-base'>
                        Bạn chỉ có thể hủy đơn hàng khi trạng thái đơn hàng còn đang chờ xử lý. Khi trạng thái đơn hàng
                        đã thay đổi sang xác nhận, việc hủy đơn hàng không còn khả thi. Nếu bạn không xác nhận đơn hàng
                        sau khi nó được giao, đơn hàng sẽ tự động được đánh dấu là đã hoàn thành sau 3 ngày.
                    </div>

                    <Divider orientation='left' className='border-[#1d4ed8] text-lg font-medium'>
                        8. Quyền sở hữu trí tuệ
                    </Divider>

                    <div className='text-base'>
                        Tất cả nội dung trên trang web của chúng tôi, bao gồm văn bản, đồ họa, logo, hình ảnh, và phần
                        mềm, là tài sản của Morata hoặc các nhà cung cấp nội dung của chúng tôi và được bảo vệ bởi luật
                        sở hữu trí tuệ. Bạn không được sử dụng bất kỳ nội dung nào mà không có sự cho phép bằng văn bản
                        của chúng tôi.
                    </div>

                    <Divider orientation='left' className='border-[#1d4ed8] text-lg font-medium'>
                        9. Miễn trừ trách nhiệm
                    </Divider>

                    <div className='text-base'>
                        Trong phạm vi tối đa được pháp luật cho phép, Morata sẽ không chịu trách nhiệm đối với bất kỳ
                        thiệt hại gián tiếp, ngẫu nhiên, đặc biệt, hậu quả nào phát sinh từ hoặc liên quan đến việc bạn
                        sử dụng dịch vụ hoặc sản phẩm của chúng tôi.
                    </div>

                    <div className='text-lg font-medium'></div>

                    <Divider orientation='left' className='border-[#1d4ed8] text-lg font-medium'>
                        10. Luật điều chỉnh
                    </Divider>

                    <div className='text-base'>
                        Các điều khoản này sẽ được điều chỉnh và giải thích theo luật pháp của Việt Nam, mà không có sự
                        ảnh hưởng của các nguyên tắc xung đột pháp luật.
                    </div>

                    <div className='text-lg font-medium'></div>

                    <Divider orientation='left' className='border-[#1d4ed8] text-lg font-medium'>
                        11. Thay đổi ToS
                    </Divider>
                    <div className='text-base'>
                        Chúng tôi bảo lưu quyền sửa đổi các điều khoản này bất cứ lúc nào. Mọi thay đổi sẽ có hiệu lực
                        ngay lập tức khi được đăng trên trang web của chúng tôi. Việc bạn tiếp tục sử dụng dịch vụ của
                        chúng tôi sau các thay đổi như vậy đồng nghĩa với việc bạn chấp nhận các điều khoản mới.
                    </div>

                    <Divider />

                    <div className='text-xl font-semibold'>Chính sách bảo mật</div>
                    <div className='text-lg font-medium'></div>

                    <Divider orientation='left' className='border-[#1d4ed8] text-lg font-medium'>
                        1. Giới thiệu
                    </Divider>
                    <div className='text-base'>
                        Morata cam kết bảo vệ quyền riêng tư của bạn. Chính sách bảo mật này giải thích cách chúng tôi
                        thu thập, sử dụng và chia sẻ thông tin về bạn khi bạn sử dụng trang web và dịch vụ của chúng
                        tôi.
                    </div>

                    <Divider orientation='left' className='border-[#1d4ed8] text-lg font-medium'>
                        2. Thông tin chúng tôi thu thập
                    </Divider>

                    <div className='text-base'>
                        Chúng tôi có thể thu thập các loại thông tin sau: <br /> - Thông tin cá nhân: Tên, địa chỉ
                        email, số điện thoại, địa chỉ giao hàng, và thông tin thanh toán. <br /> - Thông tin sử dụng:
                        Thông tin về cách bạn sử dụng trang web của chúng tôi, chẳng hạn như các trang đã truy cập, thời
                        gian ở lại trang, và các liên kết đã nhấp. <br /> - Thông tin thiết bị: Thông tin về thiết bị
                        bạn sử dụng để truy cập trang web của chúng tôi, bao gồm địa chỉ IP, loại trình duyệt, và hệ
                        điều hành.
                    </div>

                    <Divider orientation='left' className='border-[#1d4ed8] text-lg font-medium'>
                        3. Cách chúng tôi sử dụng thông tin của bạn
                    </Divider>

                    <div className='text-base'>
                        Chúng tôi sử dụng thông tin của bạn để: <br /> - Xử lý và thực hiện đơn đặt hàng của bạn. <br />{' '}
                        - Giao tiếp với bạn về đơn hàng và sản phẩm của chúng tôi. <br /> - Cải thiện trang web và dịch
                        vụ của chúng tôi. <br /> - Cá nhân hóa trải nghiệm của bạn trên trang web của chúng tôi. <br />{' '}
                        - Bảo vệ an ninh của trang web và người dùng của chúng tôi.
                    </div>

                    <Divider orientation='left' className='border-[#1d4ed8] text-lg font-medium'>
                        4. Chia sẻ thông tin của bạn
                    </Divider>

                    <div className='text-base'>
                        Chúng tôi có thể chia sẻ thông tin của bạn với: <br /> - Nhà cung cấp dịch vụ: Các công ty bên
                        thứ ba thực hiện các dịch vụ thay mặt chúng tôi, chẳng hạn như xử lý thanh toán và vận chuyển.{' '}
                        <br /> - Tuân thủ pháp luật: Cơ quan có thẩm quyền khi được yêu cầu bởi luật pháp hoặc để bảo vệ
                        quyền lợi và an toàn của chúng tôi.
                    </div>

                    <Divider orientation='left' className='border-[#1d4ed8] text-lg font-medium'>
                        5. Cookie và công nghệ theo dõi
                    </Divider>

                    <div className='text-base'>
                        Chúng tôi sử dụng cookie và các công nghệ theo dõi tương tự để thu thập thông tin về cách sử
                        dụng và thiết bị. Bạn có thể kiểm soát việc sử dụng cookie thông qua cài đặt trình duyệt của
                        bạn.
                    </div>

                    <div className='text-lg font-medium'></div>

                    <Divider orientation='left' className='border-[#1d4ed8] text-lg font-medium'>
                        6. Bảo mật dữ liệu
                    </Divider>
                    <div className='text-base'>
                        Chúng tôi thực hiện các biện pháp bảo mật phù hợp để bảo vệ thông tin của bạn khỏi việc truy cập
                        trái phép, tiết lộ, thay đổi, hoặc phá hủy.
                    </div>

                    <Divider orientation='left' className='border-[#1d4ed8] text-lg font-medium'>
                        7. Quyền của bạn
                    </Divider>

                    <div className='text-base'>
                        Bạn có quyền truy cập, chỉnh sửa, hoặc xóa thông tin cá nhân của mình. Bạn cũng có thể phản đối
                        việc xử lý thông tin của mình và yêu cầu chuyển dữ liệu. Để thực hiện các quyền này, vui lòng
                        liên hệ với chúng tôi tại <span className='text-hover'>bittisstore@gmail.com</span>.
                    </div>

                    <div className='text-lg font-medium'></div>

                    <Divider orientation='left' className='border-[#1d4ed8] text-lg font-medium'>
                        8. Thay đổi Chính sách Bảo mật
                    </Divider>

                    <div className='text-base'>
                        Chúng tôi có thể cập nhật Chính sách Bảo mật này theo thời gian. Mọi thay đổi sẽ có hiệu lực
                        ngay lập tức khi được đăng trên trang web của chúng tôi. Việc bạn tiếp tục sử dụng dịch vụ của
                        chúng tôi sau các thay đổi này đồng nghĩa với việc bạn chấp nhận Chính sách Bảo mật mới.
                    </div>

                    <Divider orientation='left' className='border-[#1d4ed8] text-lg font-medium'>
                        Liên hệ với chúng tôi
                    </Divider>

                    <div className='text-base'>
                        Nếu bạn có bất kỳ câu hỏi nào về các Điều khoản Dịch vụ và Chính sách bảo mật này, vui lòng liên
                        hệ với chúng tôi tại <span className='text-hover'>bittisstore@gmail.com</span>.
                    </div>
                </Space>
            </Modal>
        </>
    );
};

export default PolicyModal;
