export interface Asset3D {
  key: string;
  label: string;
  category: 'room' | 'device';
  url: string;
}

export const ASSETS_3D: Asset3D[] = [
  {
    key: 'sofa',
    label: 'Minimalist Sofa',
    category: 'room',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGNjuZJvM-mZ4rCjVsla--bThUY_kW34OGkw6gXeY9gThJbWd4BNujeJkYVJA8bFVaeuPnk6EAlkal6_dvrLYt7l0OcEciVOg0D4lSpy8nrsXwXk1zvqwBSqIDEBByxDpNnHrjtjtHuzFE__U6MURu8NUi2FzBk-9fjF_Pozk5XA9UtGAfZtzOq-EtSbpIbZ7Adj_pTGL_TdQOfdFadIvlTBBzFwmwRg3jP0nl0RHOa6X7Hm85fmzdld7LGpP8LrOpIwqnsLCz5fw',
  },
  {
    key: 'bed',
    label: 'Platform Bed',
    category: 'room',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtcKUME6_ghVRWaxNw-t28IiG2KVIzopEWdeHs8FKVlbbo5p94YqMydR6JPcJqi_IpfJYlHDHtDZpIr1UyXQfl-DjJf7MGgrZ-hXBlMM0SQMOza6UOlre6RWqnF_AHH7Jhx-RmIysdHDe-8_Y5sfuEHbDSpVl6sXyFCNlR7YmPnRJuJHgxnjOj6eM6pqDb_uAUnmdxox-04zjYExaU6o17a9Cx5w8QZLmZIjz8Ybe0nYPRtVnN_Sx9pdJ8nEzkRWG4MHRZKNbLrAc',
  },
  {
    key: 'kitchen',
    label: 'Kitchen Island',
    category: 'room',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGRhzKMt9xKB7c5PVu0m4Fljz3_4Thd8GIJhflPI48CAe3SmGBgmWi8y1L60IWJfj6ksPR26PIDyFWENMxwLLe2UxhKev18w4_eDBQ86fxpQ5QgJWpUn5TOWArzz7vPKd2FiBKVLjwsJNLfgT4RicuU9FWwHnJNNjVK6UUnP4ITEWV7YdIUSXgwuKts9R9ys5F1GKhLgfL2Fws6LEPQS5qdChagyoAOP37ocwo1HS5OPavJB1IydiTovk_DThtmecq-g08J1H6zMc',
  },
  {
    key: 'bathtub',
    label: 'Freestanding Tub',
    category: 'room',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-ZBxzApvXL2fpaHkcgOec2An0dyq0mAEG4Vv0cxxXXuraipatWxsmW0Wm0g0qbPQXsIDmKXoqUfVQooltAdCi7tY87wFWACFvytlHOIxWk69ra9VB5XavDIXaUCpXeXwdcXO3VEmY6KrublxTNry4Qi4jMjEc6NPGrja2UXuxk7OkCG_A_V-VdrPOG1qJG0xi_u0zE3lDLNXX3TUyDxlU852tNDo6apfPpQkVeGPhDqqF3UuAePtimzxcqSeK7L21WSIq7_x_0c8',
  },
  {
    key: 'office',
    label: 'Home Office',
    category: 'room',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5sEGFPCMqITSl6mhBRsCUYNIcYcm2aGM968YwBkP3fL3NanGn5o2RJgWWNII-vZS45id4PveVQMKhbmt1sXtEWiput9rRJGBCG0c4ZOUO8JwsnhNsYrRbCMgD9J8pRITvHf4lA0RfxWIE9rZw2wx161uUWTb0SWfM5EFxk9R7sIXvQKI8Bl7CzDQEcLJXsxNmuECN3Ujk2Zk4_EUIaYOPNSa6x78vB7uQnB7l6SSGfKxZ_4uPU-JgMTGDpick_jKgbij2qlpfBRc',
  },
  {
    key: 'vacuum',
    label: 'Vacuum Robot',
    category: 'device',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKfDaBzhKhg_IQKoTyXhELsfrbBEf7BzcKRsyCWbWpNRNJHhyE21ZsKeEPxYd6NustgiPiWSHgZHr2eBZL8j9rKO0_s0STMZB8g6R-ttceaMYD5fXo05hzDPeVxzMjxWGTogEGC6XLC2czH0eQMAqTBFFYDsC_CvEVWXamSGzwTZjiXBZfVe44QQyplHZhXOGpzuDMTrXT4iPxkb0ZuozFWWY4R1qnqoJ57JrDnxlq6--lLJywAmXQ7D910vzB3Kiqtge9zIk5Nos',
  },
  {
    key: 'purifier',
    label: 'Air Purifier',
    category: 'device',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_Nlv2zn68RXC4nfuZaqmE2myKebfe6dTsR9NDArtUFuqpUE9ZUOQ2WM2SZpkPUkwL0wfi5VnzFw3eJId3ue_EhR95uJN-jo-Xz7z5dNQEwTTBc2s9Ub_nqDjNVCOzMmfhD9bbH-qTIN1AzJ1xu0OiCA5yXgx7-GkUaaE-bqgzwGDArJtwEkQ93jrACrgGKBO27rVT2OWTaj3VNCWOn3cnJnB2h-GFIO8gk8tqTeoTS4nbDagY6R2o5bNWUZDFnFPuqfOsc-wbhz4',
  },
  {
    key: 'garden',
    label: 'Garden Irrigation',
    category: 'device',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPeHUVckOIk2iGkfkzeH65C9B7h8FnWh7QE8QjJ9YdkXEYBfYWyDKKcZwMjhyXxiNExHttYOwvIcnIvvGk78uZFC_U62cndDqfqDNxS782k-H3VjoRY7Gm88OqrQc8drc8gJKcluk5AoSYGcNsYFW2YkRYPqV5mQaHp_-fJJth2IkVPhsuROmOK0yhwYQNoZvGiZ2zJgkacLqwRbbUJbYF1UjiR_K0z2uD-kLFn8SMjkFsDiM8nokdZZE9puMSP1Fjl-0sA5LZK9Y',
  },
  {
    key: 'gym',
    label: 'Smart Home Gym',
    category: 'room',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7TWkvjhfV3TFh59u8v8pNbuenxwwgi_K89mM-LZ19MMplhEJZvh91E_RxnZ0Hip1JJNTW7r75ZFRI7rgbiQGhL6SIse23TYbacO9ocDzTPqxFJigvlUheGHAjWxMs_yZachQaf0QO2XhN9pm3og0r2Sehwnie0-2BpBhVIqX0I2hJtzoqtIxjGVp0XFl-i4hWMJk5YfY0_LFF8Wda0MeCIpwIw22_jaLbWKOq7VswT6tgAlG5vJR2iwbO_0XjuTuASqqVcMqtSEY',
  },
  {
    key: 'laundry',
    label: 'Laundry Station',
    category: 'room',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsioEPWsKXG7P7NPWjon-bqRNaaUTeQAo6snI597ohAIrhSaWiJDDWcyMciLJWC1MKnH1aMcQTvbwQZjPA3oM-FEAdEXeBHMl5cPPprFDcZyECla8nALvtmUVy2-gecMFdkPrL_ILhh6AF7oain77C9Zfaa5ZOpyzUrry5cRtQPzt8hd8l6h7FTvuVr_5Eo7EHPMMn35FH9IIdRAZ7PlMdeZDMRWmf9-wErbvBGsmIA-sYl4-2MmNAdmCQqU0lFTrRjcLZkVjMdRE',
  },
  {
    key: 'garage',
    label: 'Garage Setup',
    category: 'room',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtRgwm0K8G3ioZRt6-rHFqzfiNDRk83VWl0HdqT317-dP4BmpkDFIH3YctnJhM3Nj3ddifXhjLSNsm4UtTmb7eotN0ZCSS6mSMVWfoHg6GiLNQhHovxBQKrpEostVAjt50ks3PA7NGhui1bJjP-el4553WOpnuaX7KgG680MAaX4iGUI8P2xyDO5Ja_LeIVcXjuCjWoISswoaRjpk6Qvl8CX_-iMpMFa7HCoTZPKSOVX6A-hEhDClPpH84GQNvRhQBxpgvdoRCMfk',
  },
];

export function resolveImageUrl(image: string | undefined): string | null {
  if (!image) return null;
  const asset = ASSETS_3D.find((a) => a.key === image);
  if (asset) return asset.url;
  if (image.startsWith('http') || image.startsWith('/')) return image;
  return null;
}
