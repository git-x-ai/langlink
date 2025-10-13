export const categorizeRules = rules => {
  const categories = {
    'Frontend Frameworks': [],
    'Backend & Full-Stack': [],
    'Mobile Development': [],
    'CSS & Styling': [],
    'Database & API': [],
    'Language-Specific': [],
    'Development Tools': [],
    Other: [],
  };

  rules.forEach(rule => {
    const name = rule.name.toLowerCase();

    if (
      name.includes('react') ||
      name.includes('vue') ||
      name.includes('svelte') ||
      name.includes('angular') ||
      name.includes('nextjs') ||
      name.includes('nuxt')
    ) {
      categories['Frontend Frameworks'].push(rule);
    } else if (
      name.includes('node') ||
      name.includes('express') ||
      name.includes('fastapi') ||
      name.includes('django') ||
      name.includes('flask') ||
      name.includes('spring')
    ) {
      categories['Backend & Full-Stack'].push(rule);
    } else if (
      name.includes('mobile') ||
      name.includes('react-native') ||
      name.includes('flutter') ||
      name.includes('nativescript')
    ) {
      categories['Mobile Development'].push(rule);
    } else if (
      name.includes('tailwind') ||
      name.includes('css') ||
      name.includes('styling')
    ) {
      categories['CSS & Styling'].push(rule);
    } else if (
      name.includes('database') ||
      name.includes('prisma') ||
      name.includes('supabase') ||
      name.includes('mongodb') ||
      name.includes('sqlite')
    ) {
      categories['Database & API'].push(rule);
    } else if (
      name.includes('python') ||
      name.includes('typescript') ||
      name.includes('javascript') ||
      name.includes('cpp') ||
      name.includes('rust') ||
      name.includes('go') ||
      name.includes('java') ||
      name.includes('php')
    ) {
      categories['Language-Specific'].push(rule);
    } else if (
      name.includes('git') ||
      name.includes('testing') ||
      name.includes('clean-code') ||
      name.includes('code-quality') ||
      name.includes('devops')
    ) {
      categories['Development Tools'].push(rule);
    } else {
      categories['Other'].push(rule);
    }
  });

  return categories;
};

export const formatRuleName = name => {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace(/Enhanced|Cursorrules|Prompt|File/gi, '')
    .trim();
};

export const getRuleDescription = name => {
  const descriptions = {
    react: 'React component patterns and best practices',
    nextjs: 'Next.js App Router and performance optimization',
    vue: 'Vue.js Composition API and modern patterns',
    typescript: 'TypeScript type safety and advanced patterns',
    python: 'Python best practices and modern development',
    'node-express': 'Node.js and Express.js backend development',
    tailwind: 'Tailwind CSS styling and component patterns',
    database: 'Database design and ORM best practices',
    'clean-code': 'Clean code principles and maintainability',
    'code-quality': 'Code quality standards and practices',
    gitflow: 'Git workflow and version control best practices',
    cpp: 'C++ programming guidelines and best practices',
    fastapi: 'FastAPI development and API design',
    rust: 'Rust and Solana smart contract development',
    svelte: 'Svelte component patterns and best practices',
    nativescript: 'NativeScript mobile app development',
    medusa: 'Medusa e-commerce platform development',
  };

  const key = name.toLowerCase().replace(/-enhanced.*$/, '');
  return descriptions[key] || 'Development best practices and patterns';
};
