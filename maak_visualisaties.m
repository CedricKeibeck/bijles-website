%% Genereer alle MATLAB-websitefiguren
scriptDir = fileparts(mfilename('fullpath'));
run(fullfile(scriptDir,'goniometrische_cirkel.m'));
run(fullfile(scriptDir,'omwentelingslichaam.m'));
