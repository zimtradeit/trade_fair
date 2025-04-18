import { useRef, useState } from 'react';
import { m, useScroll, useSpring, useTransform, useMotionValueEvent} from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { paths } from 'src/routes/paths';

import { varFade, MotionContainer } from 'src/components/animate';

import { HeroBackground } from './components/hero-background';
import  { CircularMotionCards} from "./home-advertisement.jsx";
// import  {CircularMotionCards} from "./home-advertisement.jsx";


// ----------------------------------------------------------------------

const smKey = 'sm';
const mdKey = 'md';
const lgKey = 'lg';

const motionProps = {
  variants: varFade('inUp', { distance: 24 }),
};

export function HomeHero({ sx, ...other }) {
  const scrollProgress = useScrollPercent();

  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up(mdKey));

  const distance = mdUp ? scrollProgress.percent : 0;

  const y1 = useTransformY(scrollProgress.scrollY, distance * -7);
  const y2 = useTransformY(scrollProgress.scrollY, distance * -6);
  const y3 = useTransformY(scrollProgress.scrollY, distance * -5);
  const y4 = useTransformY(scrollProgress.scrollY, distance * -4);
  const y5 = useTransformY(scrollProgress.scrollY, distance * -3);

  const opacity = useTransform(
    scrollProgress.scrollY,
    [0, 1],
    [1, mdUp ? Number((1 - scrollProgress.percent / 100).toFixed(1)) : 1]
  );

  const renderHeading = () => (
    <m.div {...motionProps}>
      <Box
        component="h1"
        sx={[
          {
            my: 0,
            mx: 'auto',
            maxWidth: 680,
            display: 'flex',
            flexWrap: 'wrap',
            typography: 'h2',
            justifyContent: 'center',
            fontFamily: theme.typography.fontSecondaryFamily,
            [theme.breakpoints.up(lgKey)]: {
              fontSize: theme.typography.pxToRem(72),
              lineHeight: '90px',
            },
          },
        ]}
      >
        <Box component="span" sx={{ width: 1, opacity: 0.24 }}>
          Boost Your Trade
        </Box>
        Journey with
        <Box
          component={m.span}
          animate={{ backgroundPosition: '200% center' }}
          transition={{
            duration: 20,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          sx={{
            ...theme.mixins.textGradient(
              `300deg, ${theme.vars.palette.primary.main} 0%, ${theme.vars.palette.warning.main} 25%, ${theme.vars.palette.primary.main} 50%, ${theme.vars.palette.warning.main} 75%, ${theme.vars.palette.primary.main} 100%`
            ),
            backgroundSize: '400%',
            ml: { xs: 0.75, md: 1, xl: 1.5 },
          }}
        >
          ZimTrade
        </Box>
      </Box>
    </m.div>
  );

  const renderText = () => (
    <m.div {...motionProps}>
         <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>

             {/*<HomeAdvertisement />*/}
          <CircularMotionCards/>
      </Stack>

    </m.div>
  );

  // const renderRatings = () => (
  //   <m.div {...motionProps}>
  //     <Box
  //       sx={{
  //         gap: 1.5,
  //         display: 'flex',
  //         flexWrap: 'wrap',
  //         alignItems: 'center',
  //         typography: 'subtitle2',
  //         justifyContent: 'center',
  //       }}
  //     >
  //       <AvatarGroup sx={{ [`& .${avatarClasses.root}`]: { width: 32, height: 32 } }}>
  //         {Array.from({ length: 3 }, (_, index) => (
  //           <Avatar
  //             key={_mock.fullName(index + 1)}
  //             alt={_mock.fullName(index + 1)}
  //             src={_mock.image.avatar(index + 1)}
  //           />
  //         ))}
  //       </AvatarGroup>
  //       160+ Happy customers
  //     </Box>
  //   </m.div>
  // );

  const renderButtons = () => (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: { xs: 1.5, sm: 2 },
      }}
    >
      <m.div {...motionProps}>
        <Button
          color="inherit"
          size="large"
          variant="outlined"
          target="_blank"
          rel="noopener"
          href={paths.zimtradeUrl}
          sx={{
            borderColor: 'text.primary',
            '&:hover': {
              borderColor: '#4caf50', // Green border on hover
              backgroundColor: '#4caf50', // Green background on hover
              color: '#fff', // White text on hover
            },
          }}
        >
          Trade Zimbabwe
        </Button>

      </m.div>
    </Box>
  );


  // const renderIcons = () => (
  //   <Stack spacing={3} sx={{ textAlign: 'center' }}>
  //     <m.div {...motionProps}>
  //       <Typography variant="overline" sx={{ opacity: 0.4 }}>
  //         Available For
  //       </Typography>
  //     </m.div>
  //
  //     <Box sx={{ gap: 2.5, display: 'flex' }}>
  //       {['js', 'ts', 'nextjs', 'vite', 'figma'].map((platform) => (
  //         <m.div {...motionProps} key={platform}>
  //           <Box
  //             component="img"
  //             alt={platform}
  //             src={`${CONFIG.assetsDir}/assets/icons/platforms/ic-${platform}.svg`}
  //             sx={[
  //               {
  //                 width: 24,
  //                 height: 24,
  //                 ...theme.applyStyles('dark', {
  //                   ...(platform === 'nextjs' && { filter: 'invert(1)' }),
  //                 }),
  //               },
  //             ]}
  //           />
  //         </m.div>
  //       ))}
  //     </Box>
  //   </Stack>
  // );

  return (
    <Box
      ref={scrollProgress.elementRef}
      component="section"
      sx={[
        {
          overflow: 'hidden',
          position: 'relative',
          [theme.breakpoints.up(mdKey)]: {
            minHeight: 760,
            height: '100vh',
            maxHeight: 1440,
            display: 'block',
            willChange: 'opacity',
            mt: 'calc(var(--layout-header-desktop-height) * -1)',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        component={m.div}
        style={{ opacity }}
        sx={{
          width: 1,
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          transition: theme.transitions.create(['opacity']),
          [theme.breakpoints.up(mdKey)]: { height: 1, position: 'fixed', maxHeight: 'inherit' },
        }}
      >
        <Container
          component={MotionContainer}
          sx={{
            py: 3,
            gap: 5,
            zIndex: 9,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            [theme.breakpoints.up(mdKey)]: {
              flex: '1 1 auto',
              justifyContent: 'center',
              py: 'var(--layout-header-desktop-height)',
            },
          }}
        >
          <Stack spacing={3} sx={{ textAlign: 'center' }}>
            <m.div style={{ y: y1 }}>{renderHeading()}</m.div>
            <m.div style={{ y: y2 }}>{renderText()}</m.div>
          </Stack>

          {/*<m.div style={{ y: y3 }}>{renderRatings()}</m.div>*/}
          <m.div style={{ y: y4 }}>{renderButtons()}</m.div>
          {/*<m.div style={{ y: y5 }}>{renderIcons()}</m.div>*/}
        </Container>

        <HeroBackground />
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

function useTransformY(value, distance) {
  const physics = {
    mass: 0.1,
    damping: 20,
    stiffness: 300,
    restDelta: 0.001,
  };

  return useSpring(useTransform(value, [0, 1], [0, distance]), physics);
}

function useScrollPercent() {
  const elementRef = useRef(null);

  const { scrollY } = useScroll();

  const [percent, setPercent] = useState(0);

  useMotionValueEvent(scrollY, 'change', (scrollHeight) => {
    let heroHeight = 0;

    if (elementRef.current) {
      heroHeight = elementRef.current.offsetHeight;
    }

    const scrollPercent = Math.floor((scrollHeight / heroHeight) * 100);

    if (scrollPercent >= 100) {
      setPercent(100);
    } else {
      setPercent(Math.floor(scrollPercent));
    }
  });

  return { elementRef, percent, scrollY };
}
