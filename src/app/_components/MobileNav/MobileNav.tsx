'use client';

import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';

import NavigationIcon from '@/app/(afterLogin)/_components/Lnb/NavigationIcon/NavigationIcon';
import { useMobile } from '@/hooks/etc/useMobile';
import { useLnb } from '@/hooks/lnb/useLnb';

import styles from './MobileNav.module.css';

const cx = classNames.bind(styles);

export default function MobileNav() {
  const { isMobile, mounted } = useMobile();
  const { getNavigationHref, isActiveRoute } = useLnb();

  if (!mounted || !isMobile) {
    return null;
  }

  return (
    <nav className={cx('nav-wrapper')}>
      <div className={cx('nav-container')}>
        <Link href={getNavigationHref('/main')} className={cx('nav-item', { active: isActiveRoute('/main') })}>
          <NavigationIcon iconName="home" />
          <span className={cx('nav-label')}>홈</span>
        </Link>
        <Link href={getNavigationHref('/search')} className={cx('nav-item', { active: isActiveRoute('/search') })}>
          <NavigationIcon iconName="search" />
          <span className={cx('nav-label')}>검색</span>
        </Link>

        <button className={cx('add-link-button')}>
          <Image src="/images/icon_logo.png" alt="Add Link" width={40} height={40} />
        </button>

        <Link href={getNavigationHref('/share')} className={cx('nav-item', { active: isActiveRoute('/share') })}>
          <NavigationIcon iconName="share" />
          <span className={cx('nav-label')}>공유</span>
        </Link>
        <Link href={getNavigationHref('/settings')} className={cx('nav-item', { active: isActiveRoute('/settings') })}>
          <NavigationIcon iconName="settings" />
          <span className={cx('nav-label')}>설정</span>
        </Link>
      </div>
    </nav>
  );
}

