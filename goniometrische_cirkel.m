%% Goniometrische cirkel - didactische websitefiguur
% Genereert een vector-SVG en een PNG in assets/visualisaties.
% Pas thetaDeg aan om een andere hoek te tonen.

clear; close all; clc;

thetaDeg = 50;
theta = deg2rad(thetaDeg);

% Kleuren afgestemd op de website
blue      = [23 63 112] / 255;
lightBlue = [220 231 244] / 255;
grey      = [105 117 132] / 255;
lightGrey = [222 227 233] / 255;

scriptDir = fileparts(mfilename('fullpath'));
outDir = fullfile(scriptDir, '..', 'assets', 'visualisaties');
if ~exist(outDir, 'dir'), mkdir(outDir); end

fig = figure('Color','w','Position',[100 100 1180 520]);
t = tiledlayout(fig,1,2,'TileSpacing','compact','Padding','compact');

%% 1) Eenheidscirkel
ax1 = nexttile(t,1); hold(ax1,'on');
phi = linspace(0,2*pi,600);
plot(ax1, cos(phi), sin(phi), 'Color', blue, 'LineWidth', 2.0);
xline(ax1,0,'Color',lightGrey,'LineWidth',1.0);
yline(ax1,0,'Color',lightGrey,'LineWidth',1.0);

P = [cos(theta), sin(theta)];
plot(ax1,[0 P(1)],[0 P(2)],'-','Color',blue,'LineWidth',2.8);
plot(ax1,P(1),P(2),'o','MarkerSize',7,'MarkerFaceColor',blue,'MarkerEdgeColor',blue);
plot(ax1,[P(1) P(1)],[0 P(2)],'--','Color',grey,'LineWidth',1.2);
plot(ax1,[0 P(1)],[P(2) P(2)],'--','Color',grey,'LineWidth',1.2);

arc = linspace(0,theta,120);
plot(ax1,0.24*cos(arc),0.24*sin(arc),'-','Color',blue,'LineWidth',1.8);

text(ax1,0.33*cos(theta/2),0.33*sin(theta/2),sprintf('\\theta = %d^\\circ',thetaDeg), ...
    'Interpreter','tex','Color',blue,'FontSize',12,'HorizontalAlignment','center');
text(ax1,P(1)/2,-0.09,'cos(\theta)','Color',blue,'FontSize',12,'HorizontalAlignment','center');
text(ax1,-0.10,P(2)/2,'sin(\theta)','Color',blue,'FontSize',12,'Rotation',90,'HorizontalAlignment','center');
text(ax1,P(1)+0.08,P(2)+0.06,'P','Color',blue,'FontWeight','bold','FontSize',12);

axis(ax1,'equal');
xlim(ax1,[-1.2 1.2]); ylim(ax1,[-1.2 1.2]);
xticks(ax1,[-1 0 1]); yticks(ax1,[-1 0 1]);
box(ax1,'off');
title(ax1,'Eenheidscirkel','FontWeight','bold','Color',blue);
xlabel(ax1,'x'); ylabel(ax1,'y');
set(ax1,'FontName','Arial','FontSize',11,'XColor',grey,'YColor',grey,'LineWidth',1);

%% 2) Dezelfde hoek op sinus en cosinus
ax2 = nexttile(t,2); hold(ax2,'on');
a = linspace(0,2*pi,700);
plot(ax2,a,sin(a),'-','Color',blue,'LineWidth',2.2);
plot(ax2,a,cos(a),'--','Color',grey,'LineWidth',2.0);
xline(ax2,theta,':','Color',grey,'LineWidth',1.2);
plot(ax2,theta,sin(theta),'o','MarkerSize',7,'MarkerFaceColor',blue,'MarkerEdgeColor',blue);
plot(ax2,theta,cos(theta),'o','MarkerSize',7,'MarkerFaceColor','w','MarkerEdgeColor',grey,'LineWidth',1.5);

yline(ax2,0,'Color',lightGrey,'LineWidth',1.0);
xlim(ax2,[0 2*pi]); ylim(ax2,[-1.15 1.15]);
xticks(ax2,[0 pi/2 pi 3*pi/2 2*pi]);
xticklabels(ax2,{'0','\pi/2','\pi','3\pi/2','2\pi'});
yticks(ax2,[-1 0 1]);
box(ax2,'off'); grid(ax2,'off');
title(ax2,'Sinus en cosinus als projecties','FontWeight','bold','Color',blue);
xlabel(ax2,'hoek');
legend(ax2,{'sin(\theta)','cos(\theta)'},'Location','southoutside','Orientation','horizontal','Box','off');
set(ax2,'FontName','Arial','FontSize',11,'XColor',grey,'YColor',grey,'LineWidth',1);

%% Export
% PNG is de robuuste websiteversie en werkt met oudere MATLAB-versies.
pngFile = fullfile(outDir,'goniometrische-cirkel.png');
svgFile = fullfile(outDir,'goniometrische-cirkel.svg');

exportgraphics(fig, pngFile, ...
    'Resolution',220,'BackgroundColor','white');

% SVG-ondersteuning in exportgraphics hangt af van de MATLAB-versie.
% Probeer eerst exportgraphics; val daarna terug op print -dsvg.
svgMade = false;
try
    exportgraphics(fig, svgFile, ...
        'ContentType','vector','BackgroundColor','white');
    svgMade = true;
catch
    try
        set(fig,'Renderer','painters');
        print(fig, svgFile, '-dsvg');
        svgMade = true;
    catch MEsvg
        warning(['SVG-export wordt door deze MATLAB-versie niet ondersteund. ' ...
                 'De PNG is wel correct aangemaakt.\n%s'], MEsvg.message);
    end
end

fprintf('Gegenereerd:\n  %s\n', pngFile);
if svgMade
    fprintf('  %s\n', svgFile);
end
