%% Omwentelingslichaam - didactische websitefiguur
% Links: de 2D-oppervlakte onder f(x).
% Rechts: dezelfde curve geroteerd rond de x-as.
% Vervang f door eender welke positieve functie om andere voorbeelden te maken.

clear; close all; clc;

blue      = [23 63 112] / 255;
lightBlue = [220 231 244] / 255;
grey      = [105 117 132] / 255;
lightGrey = [222 227 233] / 255;

scriptDir = fileparts(mfilename('fullpath'));
outDir = fullfile(scriptDir, '..', 'assets', 'visualisaties');
if ~exist(outDir, 'dir'), mkdir(outDir); end

L = 3.2;
x = linspace(0,L,180);
f = @(x) 0.42 + 0.48*sin(pi*x/L).^2 + 0.08*x/L;
r = f(x);

fig = figure('Color','w','Position',[100 100 1180 520]);
t = tiledlayout(fig,1,2,'TileSpacing','compact','Padding','compact');

%% 1) Vlakke oppervlakte
ax1 = nexttile(t,1); hold(ax1,'on');
patch(ax1,[x fliplr(x)],[r zeros(size(r))],lightBlue, ...
    'EdgeColor','none','FaceAlpha',1);
plot(ax1,x,r,'Color',blue,'LineWidth',2.5);
yline(ax1,0,'Color',grey,'LineWidth',1.1);

% Een representatieve schijf voor de schijfmethode
x0 = 2.15;
r0 = f(x0);
plot(ax1,[x0 x0],[0 r0],'-','Color',blue,'LineWidth',4);
text(ax1,x0+0.07,r0/2,'r(x)','Color',blue,'FontSize',12);

xlim(ax1,[0 L]); ylim(ax1,[-0.05 1.12*max(r)]);
box(ax1,'off');
title(ax1,'2D-profiel en oppervlakte','FontWeight','bold','Color',blue);
xlabel(ax1,'x'); ylabel(ax1,'f(x)');
set(ax1,'FontName','Arial','FontSize',11,'XColor',grey,'YColor',grey,'LineWidth',1);

%% 2) Rotatie rond de x-as
ax2 = nexttile(t,2); hold(ax2,'on');
phi = linspace(0,2*pi,110);
[X,Phi] = meshgrid(x,phi);
R = f(X);
Y = R .* cos(Phi);
Z = R .* sin(Phi);

s = surf(ax2,X,Y,Z, ...
    'FaceColor',lightBlue, ...
    'EdgeColor',[0.72 0.78 0.84], ...
    'LineWidth',0.25, ...
    'FaceLighting','none');
plot3(ax2,x,r,zeros(size(x)),'Color',blue,'LineWidth',2.2);
plot3(ax2,x,-r,zeros(size(x)),'Color',blue,'LineWidth',1.2);

axis(ax2,'equal');
view(ax2,35,24);
box(ax2,'off'); grid(ax2,'off');
title(ax2,'Rotatie rond de x-as','FontWeight','bold','Color',blue);
xlabel(ax2,'x'); ylabel(ax2,'y'); zlabel(ax2,'z');
set(ax2,'FontName','Arial','FontSize',11,'XColor',grey,'YColor',grey,'ZColor',grey,'LineWidth',1);

%% Export
% Voor een 3D-surface is PNG het meest robuust voor een website.
% Een SVG-export levert hier doorgaans geen echte vectorwinst op omdat de
% surface door MATLAB vaak intern als raster wordt opgenomen.
pngFile = fullfile(outDir,'omwentelingslichaam.png');
exportgraphics(fig, pngFile, ...
    'Resolution',240,'BackgroundColor','white');

fprintf('Gegenereerd:\n  %s\n', pngFile);
