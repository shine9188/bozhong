// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    
    // 导航栏滚动效果
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // 平滑滚动到指定区域
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // 移动端关闭菜单
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // 更新当前活动链接
        updateActiveNavLink();
    });
    
    // 更新活动导航链接
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // 移动端汉堡菜单
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // 数字计数动画
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
    
    // 检查元素是否在视口中
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // 滚动显示动画
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal, .timeline-item, .stat-card, .product-card, .case-card');
        
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // 产品分类切换
    const categoryBtns = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // 更新按钮状态
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 过滤产品
            productCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // 案例分类切换
    const caseCategoryBtns = document.querySelectorAll('.case-category-btn');
    const caseCards = document.querySelectorAll('.case-card');
    
    caseCategoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // 更新按钮状态
            caseCategoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 过滤案例
            caseCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // 3D产品模型交互
    const productModels = document.querySelectorAll('.product-model');
    
    productModels.forEach(model => {
        model.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotateY(180deg)';
            this.style.transition = 'transform 0.5s ease';
        });
        
        model.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateY(0deg)';
        });
    });
    
    // 服务点悬停效果
    const servicePoints = document.querySelectorAll('.service-point');
    
    servicePoints.forEach(point => {
        point.addEventListener('mouseenter', function() {
            const region = this.getAttribute('data-region');
            showServiceInfo(region);
        });
    });
    
    function showServiceInfo(region) {
        const serviceInfo = {
            asia: '亚洲地区：定制化方案设计、设备安装调试、售后技术支持',
            europe: '欧洲地区：远程运维服务、技术培训、备件供应',
            america: '美洲地区：现场服务、定期维护、升级改造'
        };
        
        // 这里可以显示一个提示框
        console.log(serviceInfo[region]);
    }
    
    // 视差滚动效果
    function parallaxScroll() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // 表单提交处理
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            
            // 模拟提交
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.textContent = '发送中...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('感谢您的留言！我们会尽快与您联系。');
                this.reset();
                submitBtn.textContent = '发送消息';
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // 粒子背景效果
    function createParticles() {
        const particlesContainer = document.getElementById('particles-js');
        if (!particlesContainer) return;
        
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: var(--neon-green);
                border-radius: 50%;
                opacity: ${Math.random() * 0.5 + 0.1};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 10 + 5}s linear infinite;
            `;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // 添加粒子动画CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(0px) translateX(0px);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // 初始化
    createParticles();
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        revealOnScroll();
        parallaxScroll();
    });
    
    // 页面加载完成后执行
    window.addEventListener('load', function() {
        // 延迟执行计数动画，确保元素可见
        setTimeout(animateCounters, 500);
        revealOnScroll();
    });
    
    // 平滑滚动到顶部
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // 添加返回顶部按钮
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--neon-green);
        color: var(--primary-dark);
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', scrollToTop);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
        } else {
            backToTopBtn.style.opacity = '0';
        }
    });
    
    // 产品卡片点击效果
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const productName = this.querySelector('h3').textContent;
            alert(`您选择了：${productName}\n\n详细技术参数和演示视频即将推出！`);
        });
    });
    
    // 案例卡片点击效果
    caseCards.forEach(card => {
        card.addEventListener('click', function() {
            const caseName = this.querySelector('h3').textContent;
            alert(`案例详情：${caseName}\n\n完整案例视频和详细数据即将展示！`);
        });
    });
    
    // 预加载下一个内容
    function preloadNextContent() {
        // 这里可以实现预加载下一个案例或产品的逻辑
        console.log('预加载下一个内容...');
    }
    
    // 监听滚动位置，预加载内容
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY) {
            // 向下滚动
            preloadNextContent();
        }
        
        lastScrollY = currentScrollY;
    });
    
    // 初始化所有功能
    updateActiveNavLink();
    revealOnScroll();
});